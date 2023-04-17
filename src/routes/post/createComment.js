

const { Router } = require(`express`);
const router = new Router();
const { Comment: { createComment } } = require('../../controllers');
const { Response: { sendResponse, validateInput } } = require('../../utilities');
const { Comment: { createCommentSchema } } = require('../../validations');

router.post('/:id/comment', validateInput(createCommentSchema), async(req,res, next)=>{
	try {
		const data = await createComment({ ...req.body, userId: req.user._id, postId: req.params.id });
		sendResponse(req, res, 201, data);
	} catch (error) {
		next(error);
	}
});

module.exports = router;