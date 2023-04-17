
const { Post: PostService } = require('../../services');
const { Redis: { redisZremByScore, redisZadd, redisClear }, UniversalFunctions: { getDataToSet } } = require('../../utilities');
const { cacheKeys: { POST_RANGE, USER_POST } } = require('../../constants');


const updatePostCache = async(payload, updatedAt)=>{
	redisZremByScore(POST_RANGE, updatedAt);
	redisZadd(POST_RANGE, payload.updatedAt, payload);
	redisClear(`${USER_POST}${payload.userId}`);
};

const updatePost = async(payload)=>{

	let { userId, id } = payload;
	let post = await PostService.getOne({ userId, _id: id, isDeleted: false});
	if(!post) throw new Error('Invalid Operation');

	let dataToUpdate = getDataToSet(payload);
	let data = await PostService.updateOne({_id: id}, dataToUpdate);
	//update cache
	updatePostCache(data, post.updatedAt);

};


module.exports = updatePost;