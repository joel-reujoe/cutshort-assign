
const { User: UserService} = require('../../services');
const { errors: { NotFoundError } } = require('../../config');
const { UniversalFunctions: { deleteUnnecessaryUserData } } = require('../../utilities');
const { Redis: { redisGet, redisSet } } = require('../../utilities');
const { cacheKeys: { USER_ID } } = require('../../constants');

const getUser = async({_id})=>{
	let users;
	try{
		users = await redisGet(`${USER_ID}${_id}`);
	}catch(e){
		users = await UserService.getOne({ _id, isDeleted: false});
		if(!users) throw new NotFoundError();
		redisSet(`${USER_ID}${_id}`, users);
	}
	return deleteUnnecessaryUserData(users);

};


module.exports = getUser;