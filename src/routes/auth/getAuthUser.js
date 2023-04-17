
const { Router } = require(`express`);
const router = new Router();
const { Auth: { getTokenInDb } } = require('../../middlewares');
const { UniversalFunctions: { deleteUnnecessaryUserData } } = require('../../utilities');


const getAuthUser = async(req, res, token)=>{
	let auth;
	let user = await getTokenInDb(true, req, res, token, auth);
	return user;
};


router.get(`/auth`,  async (req, res, next) => {
	try {
		let { headers: { authorization: token} } = req;
		token = token.split(' ')[1];
		let user = await getAuthUser(req, res, token);

		
		res.status(200).send(deleteUnnecessaryUserData(user));

	} catch (error) {
		next(error);
	}
});

module.exports = router;