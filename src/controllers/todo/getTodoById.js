
const { Todo: TodoService} = require('../../services');
const { errors: { NotFoundError } } = require('../../config');
const { UniversalFunctions: { deleteUnnecessaryUserData } } = require('../../utilities');
const { Redis: { redisGet, redisSet } } = require('../../utilities');
const { cacheKeys: { TODO_ID } } = require('../../constants');

const getTodo = async({_id})=>{
	let todo;
	try{
		todo = await redisGet(`${TODO_ID}${_id}`);
	}catch(e){
		todo = await TodoService.getOne({ _id, isDeleted: false});
		if(!todo) throw new NotFoundError();
		redisSet(`${TODO_ID}${_id}`, todo);
	}
	return deleteUnnecessaryUserData(todo);

};


module.exports = getTodo;