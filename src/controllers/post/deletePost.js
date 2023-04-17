
const { Post: PostService } = require('../../services');
const { Redis: { redisZremByScore, redisGet, redisSet, redisClear } } = require('../../utilities');
const { cacheKeys: { POST_COUNT, POST_RANGE, USER_POST, USER_POST_COUNT, POST_ID } } = require('../../constants');

const updatePostCache = async(updatedAt, userId)=>{
	redisZremByScore(POST_RANGE, updatedAt);
	let count = await redisGet(POST_COUNT);
	count -= 1;
	redisSet(POST_COUNT, count);
	redisClear(`${USER_POST}${userId}`);
	redisClear(`${USER_POST_COUNT}${userId}`);
};

const deletePost = async({ userId, id })=>{

	let post = await PostService.getOne({ userId, _id: id});
	if(!post) throw new Error('Invalid Operation');

	await PostService.updateOne({_id: id}, {isDeleted: true});
	updatePostCache(post.updatedAt, userId);
	redisClear(`${POST_ID}${id}`);

};

module.exports = deletePost;