

const { Router } = require(`express`);
const router = new Router();
const { User: { getUsers } } = require('../../controllers');
const { Response: { sendResponse } } = require('../../utilities');


router.get('/', async(req,res, next)=>{
	try {
		const data = await getUsers(req.query);
		sendResponse(req, res, 200, data);
	} catch (error) {
		next(error);
	}
});

module.exports = router;