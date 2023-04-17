/**
 * logout.js
*/

`use strict`;

const { Auth: AuthService } = require(`../../services`);
const { Redis: { redisClear } } = require('../../utilities');
const { cacheKeys: { AUTH_TOKEN } } = require('../../constants');

const logout = async (req) => {
	const { authorization } = req.headers;
	const token = authorization && authorization.split(` `)[1];
	await redisClear(`${AUTH_TOKEN}${token}_user`);
	await AuthService.deleteOne({ token });
};

module.exports = logout;
