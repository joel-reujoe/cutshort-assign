
const { Todo: TodoService} = require('../../services');
const { Redis: { redisZremByScore, redisGet, redisSet, redisClear } } = require('../../utilities');
const { cacheKeys: { TODO_RANGE, TODO_COUNT, USER_TODO_COUNT, TODO_ID } } = require('../../constants');
const {  cacheKeys: { USER_TODO }} = require('../../constants');

const updatePostCache = async(updatedAt, userId)=>{
	redisZremByScore(TODO_RANGE, updatedAt);
	let count = await redisGet(TODO_COUNT);
	count -= 1;
	redisSet(TODO_COUNT, count);
	redisClear(`${USER_TODO}${userId}`);
	redisClear(`${USER_TODO_COUNT}${userId}`);
};


const deleteTodo = async({ userId, id: _id })=>{

	let todo = await TodoService.getOne({ userId, _id});
	if(!todo) throw new Error('Invalid Operation');

	await TodoService.updateOne({_id}, {isDeleted: true});
	updatePostCache(todo.updatedAt, userId);
	redisClear(`${TODO_ID}${_id}`);
};


module.exports = deleteTodo;