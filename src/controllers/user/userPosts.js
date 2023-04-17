const { Post: PostService} = require('../../services');
const { UniversalFunctions: { deleteUnnecessaryUserData } } = require('../../utilities');
const { Redis: { redisGet, redisSet } } = require('../../utilities');
const { cacheKeys: { USER_POST, USER_POST_COUNT } } = require('../../constants');

const userPosts = async({ id, page = 1, limit = 10 })=>{

	let posts;
	let count;
	try{

		//redis call
		posts = await redisGet(`${USER_POST}${id}`);
		count = await redisGet(`${USER_POST_COUNT}${id}`);
		let from = Math.abs(Math.ceil(limit * (page - 1)));
		let end = from + Math.abs(limit);

		posts = posts.slice(from, end);
	}catch(e){
		//db call
		count = await PostService.count({userId: id, isDeleted: false});

		posts = await PostService.getMany({userId: id, isDeleted: false}, {}, {page, limit, sortKey: 'createdAt', sortOrder: -1});

		posts = posts.map(x=>{
			return deleteUnnecessaryUserData(x);
		});

		redisSet(`${USER_POST}${id}`, posts);
		redisSet(`${USER_POST_COUNT}${id}`, count);
	}
	let pages = Math.ceil(count / limit);
	let prev = page > 1 ? page - 1 : null;
	let next = page * limit < count ? Math.ceil(page) + 1 : null;

	return {
		data: posts,
		current: page,
		pages,
		prev,
		next,
		count,
	};
};

module.exports = userPosts;