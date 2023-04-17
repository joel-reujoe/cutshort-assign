/**
 * middlewares/index.js
*/

'use strict';

const { logRequestStart, logResponseBody } = require('./req-res-interceptor');
const { rollbar } = require('./rollbar');
const { initialiseSentry } = require('./sentry');
const { verifyTokenMiddleware } = require('./verifyTokenMiddleware');
const checkRole = require('./checkRole');


module.exports = {
	logRequestStart,
	logResponseBody,
	rollbar,
	initialiseSentry,
	verifyTokenMiddleware,
	checkRole,
};
