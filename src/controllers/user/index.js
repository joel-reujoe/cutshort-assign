/**
 * user/index.js
*/

`use strict`;

const userPosts = require(`./userPosts`);
const userTodos = require('./userTodos');
const getUsers = require('./getAllUsers');
const getUser = require('./getUserById');
const updateUser = require('./updateUser');

module.exports = {
	userPosts,
	userTodos,
	getUsers,
	getUser,
	updateUser,
};
