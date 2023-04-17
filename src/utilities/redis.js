


const redisSet = async(key, data, ttl)=>{
	const redisClient = global.redisClient;
	redisClient.set(key, JSON.stringify(data),{
		EX: ttl,
	});
};

const redisGet = async(key) => {
	const redisClient = global.redisClient;
	let data = await redisClient.get(key);
	if(data === null) throw new Error(`Redis Data Not found`);

	return JSON.parse(data);
};

const redisClear = async(key)=>{
	const redisClient = global.redisClient;
	redisClient.del(key);
};

const redisZadd = async (key, score, data, ttl) => {
	const redisClient = global.redisClient;
	redisClient.zAdd(key, { score, value: JSON.stringify(data) }, {
		EX: ttl,
		NX: true,
	});
 
};

const redisZrangeGet = async(key, page, limit, options)=>{
	const redisClient = global.redisClient;
	let data = await redisClient.zRange(key, page, limit, options);
	if (data.length < 1) throw new Error(`Redis Data Not found`);
	return data.map((i) => JSON.parse(i));
};




const redisZremByScore = async (key, score) => {
	const redisClient = global.redisClient;
	redisClient.zRemRangeByScore(key, score, score);
};

module.exports = {
	redisSet,
	redisClear,
	redisGet,
	redisZadd,
	redisZrangeGet,
	redisZremByScore,
};