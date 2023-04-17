

const { Router } = require(`express`);
const router = new Router();
const { Post: { getPost } } = require('../../controllers');
const { Response: { sendResponse, validateInput } } = require('../../utilities');
const { Post: { getPostSchema } } = require('../../validations');


router.get('/:id', validateInput(getPostSchema), async(req,res, next)=>{
	try {
		const data = await getPost({ _id: req.params.id });
		sendResponse(req, res, 200, data);
	} catch (error) {
		next(error);
	}
});

module.exports = router;