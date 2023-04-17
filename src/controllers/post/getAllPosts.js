
const { Post: PostService } = require('../../services');
const { UniversalFunctions: {  paginate, getRangeCalls, getListFromDb} } = require('../../utilities');
const { cacheKeys: { POST_COUNT, POST_RANGE } } = require('../../constants');

const getPosts = async({ page = 1, limit = 10 })=>{

	let posts;
	let count;
	try {
		//redis call
		let { range, countRange } = await getRangeCalls(POST_COUNT, POST_RANGE, page, limit);
		count = countRange;
		posts = range;

	}catch(e){
		//db call
		let {list, countList } = await getListFromDb(PostService, page, limit, POST_RANGE, POST_COUNT);
		posts = list;
		count = countList;
	}

	let { pages, prev, next } = paginate(page, limit, count);

	
	return {
		data: posts,
		current: page,
		pages,
		prev,
		next,
		count,
	};
};


module.exports = getPosts;