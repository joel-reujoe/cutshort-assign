

const { Router } = require(`express`);
const router = new Router();
const { Todo: { deleteTodo } } = require('../../controllers');
const { Response: { sendResponse, validateInput } } = require('../../utilities');
const { Todo: { deleteTodoSchema } } = require('../../validations');


router.delete('/:id', validateInput(deleteTodoSchema), async(req,res, next)=>{
	try {
		await deleteTodo({ ...req.params, userId: req.user._id });
		sendResponse(req, res, 204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;