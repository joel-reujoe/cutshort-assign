

const { Router } = require(`express`);
const router = new Router();
const { Todo: { createTodo } } = require('../../controllers');
const { Response: { sendResponse, validateInput } } = require('../../utilities');
const { Todo: { createTodoSchema } } = require('../../validations');


router.post('/', validateInput(createTodoSchema), async(req,res, next)=>{
	try {
		await createTodo({ ...req.body, userId: req.user._id });
		sendResponse(req, res, 201);
	} catch (error) {
		next(error);
	}
});

module.exports = router;