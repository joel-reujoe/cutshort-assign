/**
 * services/index.js
*/

`use strict`;

module.exports = {
	Auth: require(`./wrapperService`)(`Auth`),
	Todo: require(`./wrapperService`)(`Todo`),
	User: require(`./wrapperService`)(`User`),
	Post: require(`./wrapperService`)(`Post`),
	Comment: require(`./wrapperService`)(`Comment`),
	Roles: require(`./wrapperService`)(`Role`),
};
