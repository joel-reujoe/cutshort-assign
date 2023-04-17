/**
 * validations/index.js
*/

`use strict`;

const User = require(`./user`);
const Todo = require(`./todo`);
const Post = require(`./post`);
const Comment = require(`./comment`);


module.exports = {
	User,
	Todo,
	Post,
	Comment,
};
