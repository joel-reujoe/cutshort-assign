

const { Router } = require(`express`);
const router = new Router();
const { User: { getUser } } = require('../../controllers');
const { Response: { sendResponse, validateInput } } = require('../../utilities');
const { User: { getUserSchema } } = require('../../validations');


router.get('/:id', validateInput(getUserSchema), async(req,res, next)=>{
	try {
		const data = await getUser({ _id: req.params.id });
		sendResponse(req, res, 200, data);
	} catch (error) {
		next(error);
	}
});

module.exports = router;