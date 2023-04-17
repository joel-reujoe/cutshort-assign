
const { Post: PostService } = require('../../services');
const { Redis: { redisZadd, redisGet, redisSet, redisClear }} = require('../../utilities');
const { cacheKeys: { POST_COUNT, POST_RANGE, USER_POST, USER_POST_COUNT } } = require('../../constants');


const createPost = async(payload)=>{

	let post = await PostService.create(payload);
	let count;
	try{
		count = await redisGet(POST_COUNT);
		count += 1;
		redisSet(POST_COUNT, count);
	}catch(e){
		count = await PostService.count();
		redisSet(POST_COUNT, count);
	}
	
	redisZadd(POST_RANGE, post.createdAt, post, 24*60*60);
	redisClear(`${USER_POST}${payload.userId}`);
	redisClear(`${USER_POST_COUNT}${payload.userId}`);
};

module.exports = createPost;