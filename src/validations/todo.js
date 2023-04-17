

const Joi = require(`joi`);

const createTodoSchema = {
	body: Joi.object().keys({
		title: Joi.string().trim().required().label('Title'),
	}),
};

const deleteTodoSchema = {
	params: Joi.object().keys({
		id: Joi.string().trim().required().min(24).max(24).label('Id'),
	}),
};


const updateTodoSchema = {
	body: Joi.object().keys({
		title: Joi.string().trim().label('Title'),
		completed: Joi.boolean().label(`Completed`),
	}),
	param: Joi.object().keys({
		id: Joi.string().trim().required().min(24).max(24).label('Id'),
	}),
};

const getTodoSchema = {
	params: Joi.object().keys({
		id: Joi.string().trim().required().min(24).max(24).label('Id'),
	}),
};


module.exports = {
	createTodoSchema,
	deleteTodoSchema,
	updateTodoSchema,
	getTodoSchema,
};