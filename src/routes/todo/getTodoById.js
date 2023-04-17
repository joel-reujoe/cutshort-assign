

const { Router } = require(`express`);
const router = new Router();
const { Todo: { getTodo } } = require('../../controllers');
const { Response: { sendResponse, validateInput } } = require('../../utilities');
const { Todo: { getTodoSchema } } = require('../../validations');


router.get('/:id', validateInput(getTodoSchema), async(req,res, next)=>{
	try {
		const data = await getTodo({ _id: req.params.id });
		sendResponse(req, res, 200, data);
	} catch (error) {
		next(error);
	}
});

module.exports = router;