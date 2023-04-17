

const createPost = require('./createPost');
const deletePost = require('./deletePost');
const updatePost = require('./updatePost');
const getPost = require('./getPostById');
const getPosts = require('./getAllPosts');


module.exports = {
	createPost,
	deletePost,
	updatePost,
	getPost,
	getPosts,
};