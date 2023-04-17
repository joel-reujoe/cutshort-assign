
const { Comment: CommentService } = require('../../services');
const { UniversalFunctions: { paginate, getRangeCalls, getListFromDb } } = require('../../utilities');
const { cacheKeys: { POST_COUNT_COMMENT, POST_RANGE_COMMENT } } = require('../../constants');

const getComments = async({ id, page = 1, limit = 10 })=>{

	let comments;
	let count;
	try{
		//redis call
		let { range, countRange } = await getRangeCalls(`${POST_COUNT_COMMENT}${id}`, `${POST_RANGE_COMMENT}${id}`, page, limit);

		comments = range,
		count = countRange;
	}catch(e){
	
		//db call
		let {list, countList } = await getListFromDb(CommentService, page, limit, `${POST_RANGE_COMMENT}${id}`, `${POST_COUNT_COMMENT}${id}`);
		comments = list;
		count = countList;

	}

	let { pages, prev, next } = paginate(page, limit, count);
	
	return {
		data: comments,
		current: page,
		pages,
		prev,
		next,
		count,
	};
};

module.exports = getComments;