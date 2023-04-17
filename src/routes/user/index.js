/**
 * user/index.js
*/

`use strict`;


const userPosts = require(`./userPosts`);
const userTodos = require(`./userTodos`);
const updateUser = require(`./updateUser`);
const getUser = require('./getUserById');
const getUsers = require('./getAllUsers');

module.exports = [
	userPosts,
	userTodos,
	updateUser,
	getUser,
	getUsers,
];
