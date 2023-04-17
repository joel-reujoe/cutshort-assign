

const { Router } = require(`express`);
const router = new Router();
const { Todo: { updateTodo } } = require('../../controllers');
const { Response: { sendResponse, validateInput } } = require('../../utilities');
const { Todo: { updateTodoSchema } } = require('../../validations');


router.patch('/:id', validateInput(updateTodoSchema), async(req,res, next)=>{
	try {
		await updateTodo({ ...req.body, userId: req.user._id, _id: req.params.id });
		sendResponse(req, res, 204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;