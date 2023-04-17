
const { Todo: TodoService} = require('../../services');
const { UniversalFunctions: { paginate, getRangeCalls , getListFromDb} } = require('../../utilities');
const { cacheKeys: { TODO_COUNT, TODO_RANGE } } = require('../../constants');



const getTodos = async({ page = 1, limit = 10 })=>{

	let todos;
	let count;
	try {
		//redis call
		let { range, countRange } = await getRangeCalls(TODO_COUNT, TODO_RANGE, page, limit);
		count = countRange;
		todos = range;
	}catch(e){
		//db call
		let {list, countList } = await getListFromDb(TodoService, page, limit, TODO_RANGE, TODO_COUNT);
		todos = list;
		count = countList;
	}

	let { pages, prev, next } = paginate(page, limit, count);

	return {
		data: todos,
		current: page,
		pages,
		prev,
		next,
		count,
	};

};


module.exports = getTodos;