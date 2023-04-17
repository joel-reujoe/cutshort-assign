/**
 * universalFunctions.js
*/

`use strict`;
const JWT = require(`jsonwebtoken`);
const MD5 = require(`md5`);
const { User: UserService } = require(`../services`);
const { NotFoundError  } = require(`../config/errors`);
const { redisZrangeGet, redisGet, redisSet, redisZadd } = require('./redis');
const {
	server: { JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY },
	i18n: {
		errorMessages: { NOT_FOUND },
	},
} = require(`../constants`);

const encryptString = (str) => {
	return MD5(MD5(str));
};

const generateToken = (data, expiresIn = `1d`) => {
	return JWT.sign(data, JWT_SECRET_KEY, { expiresIn });
};

const generateRefreshToken = (data, expiresIn = `1d`) => {
	return JWT.sign(data, JWT_REFRESH_SECRET_KEY, { expiresIn });
};

const verifyToken = async (token) => {
	return new Promise((resolve, reject) => {
		JWT.verify(token, JWT_SECRET_KEY, async (err, decoded) => {
			if (err) return reject(err);
			if (decoded._id) {
				const user = await UserService.getOne({ _id: decoded._id });
				if (user) return resolve(deleteUnnecessaryUserData(user));
			}
			reject(new NotFoundError(NOT_FOUND));
		});
	});
};

const refreshToken = async(refreshToken)=>{
	return new Promise((resolve,reject)=>{
		JWT.verify(refreshToken, JWT_REFRESH_SECRET_KEY,(err, decoded) => {
			if (err) {
				reject(err);	
			}
			else {
				// Correct token we send a new access token
				const accessToken = JWT.sign({
					_id: decoded._id,
				}, JWT_SECRET_KEY, {
					expiresIn: '10m',
				});
				resolve({accessToken, _id: decoded._id});
			}
		});
	});
};

const deleteUnnecessaryUserData = (data) => {
	delete data.password;
	delete data.isDeleted;
	delete data.__v;
	return data;
};

const pick = (object, keys) => {
	return keys.reduce((obj, key) => {
		if (object && Object.prototype.hasOwnProperty.call(object, key)) {
			obj[key] = object[key];
		}
		return obj;
	}, {});
};

const getDataToSet = (payload)=>{
	const keys = Object.keys(payload);
	let dataToUpdate = {};

	for(let key in keys){
		dataToUpdate[keys[parseInt(key)]] = payload[keys[parseInt(key)]];
	}

	return dataToUpdate;
};

const paginate = (page, limit, count)=>{
	let pages = Math.ceil(count / limit);
	let prev = page > 1 ? page - 1 : null;
	let next = page * limit < count ? Math.ceil(page) + 1 : null;

	return { 
		pages,
		prev,
		next,
	};
};

const getRangeCalls = async(countKey, rangeKey, page, limit)=>{
	let countRange = await redisGet(countKey);
	let options = { REV: true };
	let range = await redisZrangeGet(rangeKey, 0, countRange, options);
	let from = Math.abs(Math.ceil(limit * (page - 1)));
	let end = from + Math.abs(limit);
	range = range.filter(x=>x.isDeleted === false);
	range = range.slice(from, end);
	return {range, countRange};
};

const getListFromDb = async(Service, page, limit, rangeKey, countKey)=>{
	let countList = await Service.count({isDeleted: false});
	let list = await Service.getMany({ isDeleted: false},{}, { page, limit, sortKey: 'createdAt', sortOrder: -1 });
	list = list.map(x=>{
		redisZadd(rangeKey, x.createdAt, x);
		return deleteUnnecessaryUserData(x);
	});
	await redisSet(countKey, countList);
	return { list, countList };
};

module.exports = {
	encryptString,
	generateToken,
	generateRefreshToken,
	verifyToken,
	deleteUnnecessaryUserData,
	pick,
	refreshToken,
	getDataToSet,
	paginate,
	getRangeCalls,
	getListFromDb,
};
