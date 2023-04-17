const Joi = require(`joi`);

const createCommentSchema = {
	params: Joi.object().keys({
		id: Joi.string().required().min(24).max(24).label('Id'),
	}),
	body: Joi.object().keys({
		comment: Joi.string().required().min(4).max(255).label('Comment'),
	}),
};

module.exports = {
	createCommentSchema,
};