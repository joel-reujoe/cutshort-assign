const { Todo: TodoService} = require('../../services');
const { UniversalFunctions: { deleteUnnecessaryUserData } } = require('../../utilities');
const { Redis: { redisGet, redisSet } } = require('../../utilities');
const { cacheKeys: { USER_TODO, USER_TODO_COUNT } } = require('../../constants');


const userTodos = async({ id, page = 1, limit = 10 })=>{

	let todos;
	let count;
	try{
		//redis call
		todos = await redisGet(`${USER_TODO}${id}`);
		count = await redisGet(`${USER_TODO_COUNT}${id}`);

		let from = Math.abs(Math.ceil(limit * (page - 1)));
		let end = from + Math.abs(limit);

		todos = todos.slice(from, end);
	}catch(e){
		//db call 
		count = await TodoService.count({userId: id, isDeleted: false});
		todos = await TodoService.getMany({userId: id, isDeleted: false}, {}, {page, limit, sortKey: 'createdAt', sortOrder: -1});

		todos = todos.map(x=>{
			return deleteUnnecessaryUserData(x);
		});
		redisSet(`${USER_TODO}${id}`, todos);
		redisSet(`${USER_TODO_COUNT}${id}`, count);
	}

	let pages = Math.ceil(count / limit);
	let prev = page > 1 ? page - 1 : null;
	let next = page * limit < count ? Math.ceil(page) + 1 : null;

	return {
		data: todos,
		current: page,
		pages,
		prev,
		next,
		count,
	};
};

module.exports = userTodos;