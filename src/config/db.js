/**
 * db.js
*/

`use strict`;

const { db: { MONGO_CLUSTER_URI, REDIS_URI } } = require(`../constants`);

module.exports = {
	mongoUri: MONGO_CLUSTER_URI,
	redisUri: REDIS_URI,
	dbOptions: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		connectTimeoutMS: 1000,
	},
};
