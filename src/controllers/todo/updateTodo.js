
const { Todo: TodoService} = require('../../services');
const { Redis: { redisZremByScore, redisZadd, redisClear }, UniversalFunctions: { getDataToSet } } = require('../../utilities');
const { cacheKeys: { TODO_RANGE, USER_TODO, TODO_ID } } = require('../../constants');


const updatePostCache = async(payload, updatedAt)=>{
	redisZremByScore(TODO_RANGE, updatedAt);
	redisZadd(TODO_RANGE, payload.updatedAt, payload);
	redisClear(`${USER_TODO}${payload.userId}`);
};


const updateTodo = async(payload)=>{

	let { userId, _id } = payload;
	let todo = await TodoService.getOne({ userId, _id, isDeleted: false});
	if(!todo) throw new Error('Invalid Operation');

	let dataToUpdate = getDataToSet(payload);

	let data = await TodoService.updateOne({_id }, dataToUpdate);

	updatePostCache(data, todo.updatedAt);
	redisClear(`${TODO_ID}${_id}`);
};


module.exports = updateTodo;