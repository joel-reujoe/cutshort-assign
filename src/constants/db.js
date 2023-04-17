/**
 * db.js
*/

`use strict`;



require(`dotenv`).config();

module.exports = {
	// should ideally be kept in kubernetes secrets. but for purpose of this assignment are exposed
	MONGO_CLUSTER_URI: process.env.MONGO_CLUSTER_URI || `mongodb+srv://joeldsouza:fDpMBtsTKODPjhIz@cluster0.mbfpliz.mongodb.net/cutshort?retryWrites=true&w=majority`,
	REDIS_URI: process.env.REDIS_URI || 'redis://default:Y6P0mPfu21@35.200.229.238:6379',
};
