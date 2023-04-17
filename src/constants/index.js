/**
 * constants/index.js
*/

`use strict`;

const db = require(`./db`);
const i18n = require(`./i18n`);
const server = require(`./server`);
const cacheKeys = require(`./cacheKeys`);

module.exports = {
	db,
	i18n,
	server,
	cacheKeys,
};
