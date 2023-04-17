

const { Router } = require(`express`);
const router = new Router();
const { Todo: { getTodos } } = require('../../controllers');
const { Response: { sendResponse } } = require('../../utilities');


router.get('/', async(req,res, next)=>{
	try {
		const data = await getTodos(req.query);
		sendResponse(req, res, 200, data);
	} catch (error) {
		next(error);
	}
});

module.exports = router;