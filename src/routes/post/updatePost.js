

const { Router } = require(`express`);
const router = new Router();
const { Post: { updatePost } } = require('../../controllers');
const { Response: { sendResponse, validateInput } } = require('../../utilities');
const { Post: { updateTodoSchema } } = require('../../validations');


router.patch('/:id', validateInput(updateTodoSchema), async(req,res, next)=>{
	try {
		await updatePost({ ...req.body, userId: req.user._id, id: req.params.id });
		sendResponse(req, res, 204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;