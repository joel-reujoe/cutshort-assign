

const { Router } = require(`express`);
const router = new Router();


const { User: { getUserTodoSchema } } = require(`../../validations`);
const { User: { userTodos } } = require(`../../controllers`);
const { Response: { validateInput, sendResponse } } = require(`../../utilities`);

router.get(`/:id/todos`, validateInput(getUserTodoSchema), async (req, res, next) => {
	try {
		let { page, limit } = req.query;
		const data = await userTodos({...req.params, page, limit });
		sendResponse(req, res, 200, data);
	} catch (error) {
		next(error);
	}
});

module.exports = router;