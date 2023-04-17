/**
 * models/index.js
*/

`use strict`;

const Auth = require(`./auth`);
const User = require(`./user`);
const Todo = require(`./todo`);
const Post = require(`./post`);
const Comment = require(`./comment`);

module.exports = {
	Auth,
	User,
	Todo,
	Post,
	Comment,
};
