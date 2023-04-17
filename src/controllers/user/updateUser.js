const { User: UserService } = require('../../services');
const { Redis: { redisClear }, UniversalFunctions: { getDataToSet } } = require('../../utilities');
const { cacheKeys: { USER_ID } } = require('../../constants');


const updateUser = async(payload)=>{
    
	let { _id } = payload;
	let user = await UserService.getOne({_id});
	if(!user) throw new Error('User does not exist');

	let dataToUpdate = getDataToSet(payload);
	await UserService.updateOne({_id},dataToUpdate);
	redisClear(`${USER_ID}${_id}`);
};

module.exports = updateUser;