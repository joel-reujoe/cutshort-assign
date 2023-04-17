/**
 * db.js
*/

`use strict`;

const mongoose = require(`mongoose`);
const redis = require(`redis`);
const { db: { dbOptions, mongoUri, redisUri }, middlewares: { logRequestStart, logResponseBody }} = require(`../config`);

const init = async () => {
	mongoose.connection.once(`open`, async () => {
		console.info(`MongoDB event open`);
		console.debug(`MongoDB connected to ${mongoUri}`);

		mongoose.connection.on(`connected`, () => {
			console.info(`MongoDB event connected`);
		});

		mongoose.connection.on(`disconnected`, () => {
			console.warn(`MongoDB event disconnected`);
		});

		mongoose.connection.on(`reconnected`, () => {
			console.info(`MongoDB event reconnected`);
		});

		mongoose.connection.on(`error`, (error) => {
			console.error(`MongoDB event error===>`, error, `---MongoDB event error`);
		});

		try {
			// Bootstrap dummy data
		} catch (error) {
			console.error(`Mongo Syntax Error===>`, error, `---Mongo Syntax Error`);
		}
	});

	await mongoose.connect(mongoUri, dbOptions, (error) => {
		if (error) {
			console.error(`MongoDB connection error===>`, error, `---MongoDB connection error`);
			process.exit(1);
		}
	});

	const redisClient = redis.createClient({ url: `${redisUri}` });
	redisClient.on(`connect`, async () => {
		console.info(`Redis connected`);
	});
	redisClient.on(`error`, (err) => console.log(`Redis Client Error`, err));
	await redisClient.connect();


	
	global.jml = {
		logRequestStart,
		logResponseBody,
	};
	
	return { mongoose, redisClient };
};

module.exports = {
	init,
};
