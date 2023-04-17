
const { Comment: CommentService } = require('../../services');
const { Redis: { redisZadd, redisGet, redisSet} } = require('../../utilities');
const { cacheKeys: { POST_COUNT_COMMENT, POST_RANGE_COMMENT } } = require('../../constants');

const createComment = async(payload)=>{
	let { postId } = payload;

	let comment = await CommentService.create(payload);
	let count;
	try{
		count = await redisGet(`${POST_COUNT_COMMENT}${postId}`);
		count += 1;
		redisSet(`${POST_COUNT_COMMENT}${postId}`, count);
	}catch(e){
		count = await CommentService.count();
		redisSet(`${POST_COUNT_COMMENT}${postId}`, count);
	}

	redisZadd(`${POST_RANGE_COMMENT}${postId}`, comment.createdAt, comment);

};

module.exports = createComment;