

const { Router } = require(`express`);
const router = new Router();
const { Comment: { getComments } } = require('../../controllers');
const { Response: { sendResponse, validateInput } } = require('../../utilities');
const { Comment: { getPostSchema } } = require('../../validations');


router.get('/:id/comments', validateInput(getPostSchema), async(req,res, next)=>{
	try {
		let { page, limit } = req.query;
		const data = await getComments({ id: req.params.id, page, limit });
		sendResponse(req, res, 200, data);
	} catch (error) {
		next(error);
	}
});

module.exports = router;