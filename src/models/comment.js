/**
 * auth.js
*/

`use strict`;

const { model, Schema } = require(`mongoose`);

const commentSchema = new Schema(
	{
		postId: {
			type: Schema.Types.ObjectId,
			required: true,
			index: true,
			ref: 'Post',
		},
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			index: true,
			ref: `User`,
		},
		comment: {
			type: Schema.Types.String,
		},
		isDeleted:{
			type: Schema.Types.Boolean,
			default: false,
		},
		createdAt: {
			type: Number,
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

commentSchema.index({ validTill: 1 }, { expireAfterSeconds: 0 });

module.exports = model(`Comment`, commentSchema);
