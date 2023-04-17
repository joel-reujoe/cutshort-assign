
const { User: UserService} = require('../../services');
const { UniversalFunctions: { deleteUnnecessaryUserData, paginate } } = require('../../utilities');
const { Redis: { redisGet, redisSet, redisZrangeGet, redisZadd } } = require('../../utilities');
const { cacheKeys: { USER_COUNT, USER_RANGE } } = require('../../constants');


const getUsers = async({ page, limit })=>{

	
	if(!page) page = 1;
	if(!limit) limit = 10;
	let users;
	let count;
	try {
		//redis call
		count = await redisGet(USER_COUNT);
		let options = { REV: true };
		users = await redisZrangeGet(USER_RANGE, 0, count, options);
		let from = Math.abs(Math.ceil(limit * (page - 1)));
		let end = from + Math.abs(limit);

		users = users.slice(from, end);
	}catch(e){
		//db call
		count = await UserService.count();
		users = await UserService.getMany({ isDeleted: false},{}, { page, limit, sortKey: 'createdAt', sortOrder: -1 });
		users = users.map(x=>{
			redisZadd(USER_RANGE, x.createdAt, x);
			return deleteUnnecessaryUserData(x);
		});
		await redisSet(USER_COUNT, count);

	
	}
	let { pages, prev, next } = paginate(page, limit, count);


	return {
		data: users,
		current: page,
		pages,
		prev,
		next,
		count,
	};

};


module.exports = getUsers;