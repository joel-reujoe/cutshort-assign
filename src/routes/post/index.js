
const createPost = require('./createPost');
const deletePost = require('./deletePost');
const updatePost = require('./updatePost');
const getPost = require('./getPostById');
const getPosts = require('./getAllPosts');
const createComment = require('./createComment');
const getComments = require('./getComments');


module.exports = [
	createPost,
	deletePost,
	updatePost,
	getPost,
	getPosts,
	getComments,
	createComment,
];
