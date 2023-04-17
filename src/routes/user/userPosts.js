

const { Router } = require(`express`);
const router = new Router();


const { User: { getUserPostSchema } } = require(`../../validations`);
const { User: { userPosts } } = require(`../../controllers`);
const { Response: { validateInput, sendResponse } } = require(`../../utilities`);

router.get(`/:id/posts`, validateInput(getUserPostSchema), async (req, res, next) => {
	try {
		let { page, limit } = req.query;
		const data = await userPosts({...req.params, page, limit });
		sendResponse(req, res, 200, data);
	} catch (error) {
		next(error);
	}
});

module.exports = router;