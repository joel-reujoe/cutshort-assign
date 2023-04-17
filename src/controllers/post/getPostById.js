
const { Post: PostService} = require('../../services');
const { errors: { NotFoundError } } = require('../../config');
const { UniversalFunctions: { deleteUnnecessaryUserData } } = require('../../utilities');
const { Redis: { redisGet, redisSet } } = require('../../utilities');

const getPost = async({ _id })=>{


	let post;
	try{
		post = await redisGet(`POST_${_id}`);
	}catch(e){
		post = await PostService.getOne({ _id, isDeleted: false});
		if(!post) throw new NotFoundError();
		redisSet(`POST_${_id}`, post);
	}
	return deleteUnnecessaryUserData(post);

};


module.exports = getPost;