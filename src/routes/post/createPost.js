

const { Router } = require(`express`);
const router = new Router();
const { Post: { createPost } } = require('../../controllers');
const { Response: { sendResponse, validateInput } } = require('../../utilities');
const { Post: { createPostSchema } } = require('../../validations');

router.post('/', validateInput(createPostSchema), async(req,res, next)=>{
	try {
		await createPost({ ...req.body, userId: req.user._id });
		sendResponse(req, res, 201);
	} catch (error) {
		next(error);
	}
});

module.exports = router;