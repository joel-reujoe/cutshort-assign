
const { Todo: TodoService} = require('../../services');
const { Redis: { redisSet, redisGet, redisZadd, redisClear } } = require('../../utilities');
const { cacheKeys: { TODO_COUNT, TODO_RANGE, USER_TODO } } = require('../../constants');
const { USER_TODO_COUNT } = require('../../constants/cacheKeys');


const createTodo = async(payload)=>{
        
	let post = await TodoService.create(payload);
	let count;
	try{
		count = await redisGet(TODO_COUNT);
		count += 1;
		redisSet(TODO_COUNT, count);
	}catch(e){
		count = await TodoService.count();
		redisSet(TODO_COUNT, count);
	}
	
	redisZadd(TODO_RANGE, post.createdAt, post, 1000);
	redisClear(`${USER_TODO}${payload.userId}`);
	redisClear(`${USER_TODO_COUNT}${payload.userId}`);
};


module.exports = createTodo;