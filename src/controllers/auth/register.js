/**
 * login.js
*/

`use strict`;

const { User: UserService} = require(`../../services`);
const { UniversalFunctions: { deleteUnnecessaryUserData } } = require(`../../utilities`);

const register = async (payload) => {
	let { email } = payload;

	let user = await UserService.getOne({ email });
	
	if (user) throw new Error('User Exists');

	user = await UserService.create(payload);

	return deleteUnnecessaryUserData(user);
};

module.exports = register;
