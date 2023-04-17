/**
 * user.js
*/

`use strict`;

const Joi = require(`joi`);

const loginSchema = {
	body: Joi.object().keys({
		email: Joi.string().trim().required().email().label('Email'),
		password: Joi.string().trim().required().min(8).label('Password'),
	}),
};

const registrationSchema = {
	body: Joi.object().keys({
		email: Joi.string().trim().email().required().label('Email'),
		password: Joi.string().trim().required().min(8).label('Password'),
	}),
};

const getUserPostSchema = {
	params: Joi.object().keys({
		id: Joi.string().trim().min(24).max(24).label('userId'),
	}),
	query: Joi.object().keys({
		page: Joi.number().label('Page'),
		limit: Joi.number().label('Limit'),
	}),
};

const getUserTodoSchema = {
	params: Joi.object().keys({
		id: Joi.string().trim().min(24).max(24).label('userId'),
	}),
	query: Joi.object().keys({
		page: Joi.number().label('Page'),
		limit: Joi.number().label('Limit'),
	}),
};


const updateUserSchema = {
	body: Joi.object().keys({
		email: Joi.string().trim().label('Title'),
		password: Joi.boolean().label(`Completed`),
		role: Joi.string().label('Role'),
	}),
	params: Joi.object().keys({
		id: Joi.string().trim().required().min(24).max(24).label('Id'),
	}),
};

const getUserSchema = {
	params: Joi.object().keys({
		id: Joi.string().trim().required().label('Id'),
	}),
};



module.exports = {
	loginSchema,
	registrationSchema,
	getUserPostSchema,
	getUserTodoSchema,
	updateUserSchema,
	getUserSchema,
};
