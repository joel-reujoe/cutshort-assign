/**
 * auth.js
*/

"use strict";

const { Auth: AuthService } = require(`../services`);
const {
	UniversalFunctions: { verifyToken },
	Response: { sendResponse },
	Redis: { redisGet, redisSet },
} = require(`../utilities`);
const { i18n: { errorMessages: { INVALID_TOKEN } }, cacheKeys: { AUTH_TOKEN }, server: { JWT_SECRET_KEY } } = require(`../constants`);

const getTokenFromDb = async (token) => {
	let auth;
	try {
		auth = await redisGet(`${AUTH_TOKEN}${token}_user`);
	} catch (e) {
		const validTill = new Date(Date.now()).toUTCString();
		let criteria = {$and: [ {token: token},
			{validTill: { $gte: validTill }} ]};
		auth = await AuthService.getOne(criteria);
		if (auth) await redisSet(`${AUTH_TOKEN}${token}_user`, auth, 60 * 60 * 24 * 365);
	}
	return auth;
};

const getTokenInDb = async(checkTokenInDB, req, res, token, auth)=>{
	if (checkTokenInDB) {
		auth = await getTokenFromDb(token);
		if (!auth) return sendResponse(req, res, 401, { error: INVALID_TOKEN });
	}
	return verifyToken(token, JWT_SECRET_KEY);
};

const isLoggedIn = (checkTokenInDB = true) => async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		const token = authorization && authorization.split(` `)[1];
		let auth;

		if (!token) {
			return sendResponse(req, res, 401, { error: INVALID_TOKEN });
		}

		try {
			let user = await getTokenInDb(checkTokenInDB, req, res, token, auth);
			if(auth) user.refreshToken = auth.refreshToken;
			req.user = user;
		} catch (error) {
			let user = await getTokenInDb(checkTokenInDB, req, res, token, auth);
			if (!user) return sendResponse(req, res, 401, { error: INVALID_TOKEN });
			if (auth?._id) user.authId = auth?._id;
			req.user = user;
			await redisSet(`${AUTH_TOKEN}${token}_user`, req.user, 24*60*60);
		}
		return next();
	} catch (error) {
		sendResponse(req, res, 401, { error: INVALID_TOKEN });
	}
};

module.exports = {
	isLoggedIn,
	getTokenInDb,
};
