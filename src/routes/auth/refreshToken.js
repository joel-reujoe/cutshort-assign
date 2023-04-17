

const { Router } = require('express');
const router = new Router();
const { Auth: { refreshToken: refreshTokenAuth } } = require('../../controllers');
const { UniversalFunctions: { refreshToken } } = require('../../utilities');
const { Response: { sendResponse } } = require('../../utilities');

router.post('/refreshToken',  async (req, res, next) => {
	try {
		let { headers: { authorization: token} } = req;
		token = token.split(' ')[1];

		if(!refreshToken) sendResponse(req, res, 401, { message: 'Unauthorized' });
		
		let { accessToken, _id } = await refreshToken(token);
		token = await refreshTokenAuth({token: accessToken, refreshToken: token, _id });
		sendResponse(req, res, 200, { token });
		
	} catch (error) {
		next(error);
	}
});

module.exports = router;