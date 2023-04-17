

const { Router } = require(`express`);
const router = new Router();
const { Post: { deletePost } } = require('../../controllers');
const { Response: { sendResponse, validateInput } } = require('../../utilities');
const { Post: { deletePostSchema } } = require('../../validations');


router.delete('/:id', validateInput(deletePostSchema), async(req,res, next)=>{
	try {
		await deletePost({ ...req.params, userId: req.user._id });
		sendResponse(req, res, 204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;