

const Joi = require(`joi`);


const createPostSchema = {
	body: Joi.object().keys({
		title: Joi.string().required().min(5).label(`Title`),
		body: Joi.string().required().label(`Title`),
	}),
};

const deletePostSchema = {
	params: Joi.object().keys({
		id: Joi.string().trim().required().min(24).max(24).label('Id'),
	}),
};

const updateTodoSchema = {
	body: Joi.object().keys({
		title: Joi.string().trim().required().label('Title'),
		body: Joi.string().required().label(`Body`),
	}),
	params: Joi.object().keys({
		id: Joi.string().trim().required().min(24).max(24).label('Id'),
	}),
};

const getPostSchema = {
	params: Joi.object().keys({
		id: Joi.string().trim().required().min(24).max(24).label('Id'),
	}),
};



module.exports = {
	createPostSchema,
	deletePostSchema,
	updateTodoSchema,
	getPostSchema,
};