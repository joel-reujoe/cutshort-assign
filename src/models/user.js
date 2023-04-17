/**
 * user.js
*/

`use strict`;

const { model, Schema } = require(`mongoose`);
const { setEncrypted, getDecrypted } = require('../utilities/encryption');


const userSchema = new Schema(
	{
		email: {
			type: String,
			unique: true,
			index: true,
			sparse: true,
			set: setEncrypted,
			get: getDecrypted,
		},
		password: { 
			type: String,
			set: setEncrypted,
			get: getDecrypted,
		},
		isAdmin: {
			type: Boolean,
			default: false,
			index: true,
		},
		isActive: {
			type: Boolean,
			default: true,
			index: true,
		},
		role: {
			type: Schema.Types.String,
			default: "member",
		},
		isDeleted: {
			type: Boolean,
			default: false,
			index: true,
		},
		createdAt: {
			type: Number,
			// set: function (datetime) { Math.floor(new Date(datetime).now() / 1000) }
		},
		updatedAt: {
			type: Number,
		},
	},
	{
		// Make Mongoose use Unix time (seconds since Jan 1, 1970)
		timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
	},
);

module.exports = model(`User`, userSchema);
