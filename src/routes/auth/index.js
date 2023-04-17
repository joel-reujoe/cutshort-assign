const login = require('./login');
const register = require('./register');
const refreshToken = require('./refreshToken');
const logout = require('./logout');
const getAuthUser = require('./getAuthUser');



module.exports = [
	login,
	register,
	refreshToken,
	logout,
	getAuthUser,
];