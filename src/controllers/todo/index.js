

const createTodo = require('./createTodo');
const deleteTodo = require('./deleteTodo');
const updateTodo = require('./updateTodo');
const getTodo = require('./getTodoById');
const getTodos = require('./getAllTodos');



module.exports = {
	createTodo,
	deleteTodo,
	updateTodo,
	getTodo,
	getTodos,
};