/**
 * logout.js
*/

'use strict';

const { Router } = require('express');
const router = new Router();
const { Auth: { logout } } = require('../../controllers');
const { Response: { sendResponse } } = require('../../utilities');

router.delete('/logout',  async (req, res, next) => {
	try {
		await logout(req);
		sendResponse(req, res, 204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
