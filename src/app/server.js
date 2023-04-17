/**
 * server.js
*/

'use strict';

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const {
	server: { PORT, SENTRY_DSN, ENVIRONMENT },
	i18n: { errorMessages: { NOT_FOUND } },
} = require('../constants');

const {
	Auth: {
		isLoggedIn,
	},
} = require('../middlewares');


const {
	Response: { sendResponse },
} = require('../utilities');
const swaggerDocument = ENVIRONMENT === 'production' ? require('./swagger-prod.json') : require('./swagger-local.json');

const {
	errors: { NotFoundError, ValidationError },
	middlewares: {
		// rollbar,
		initialiseSentry,
	},
} = require('../config');


const init = () => {
	const app = express();
	app.use(express.json());
	app.use(cors());

	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
	app.use(global.jml.logRequestStart);
	app.use(global.jml.logResponseBody);

	app.use('/public', express.static('public'));

	const { User, Todo, Post, Auth } = require('../routes');

	app.get('/', (_req, res)=>{
		res.send(`Hello World`);
	});
	app.use('/', Auth);

	app.use(isLoggedIn());
	app.use('/user', User);
	app.use('/users', User);
	app.use('/todos', Todo);
	app.use('/todo', Todo);
	app.use('/posts',Post);
	app.use('/post', Post);
	


	

	app.use((req, res) => {
		sendResponse(req, res, 404, { message: NOT_FOUND });
	});

	// app.use(rollbar.errorHandler());
	if (SENTRY_DSN) {
		const Sentry = initialiseSentry(app);
		app.use(Sentry.Handlers.errorHandler());
	}

	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, next) => {
		if (err instanceof NotFoundError) return sendResponse(req, res, 404, { error: err.message || err });
		if (err instanceof ValidationError) return sendResponse(req, res, 422, { error: err.message || err });
		if (process.env.NODE_ENV === 'development') console.error('Server Error===>', err, '---Server Error');
		sendResponse(req, res, 500, { error: err.message || err });
	});
	return app;
};

module.exports = {
	init,
	port: PORT,
};
