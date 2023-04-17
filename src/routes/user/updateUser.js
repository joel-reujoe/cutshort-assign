

const { Router } = require(`express`);
const router = new Router();
const {User: { updateUser } } = require('../../controllers');
const { Response: { sendResponse, validateInput } } = require('../../utilities');
const { User: { updateUserSchema } } = require('../../validations');
const { middlewares: { checkRole }  } = require('../../config');


router.patch('/:id', validateInput(updateUserSchema), checkRole, async(req,res, next)=>{
	try {
		await updateUser({ ...req.body, _id: req.params.id });
		sendResponse(req, res, 204);
	} catch (error) {
		next(error);
	}
});

module.exports = router;