/**
 * login.js
*/

'use strict';

const { Router } = require('express');
const router = new Router();

const { User: { loginSchema } } = require('../../validations');
const { Auth: { register } } = require('../../controllers');
const { Response: { validateInput, sendResponse } } = require('../../utilities');

router.post('/register', validateInput(loginSchema), async (req, res, next) => {
	try {
		const data = await register(req.body);
		sendResponse(req, res, 200, data);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
