`use strict`;

const { model, Schema } = require(`mongoose`);


const todoSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			index: true,
			ref: `User`,
		},
		title: { 
			type: Schema.Types.String,
			required: true,
		},
		completed: { 
			type: Schema.Types.Boolean,
			default: false,
		},
		isDeleted: { 
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

todoSchema.index({ validTill: 1 }, { expireAfterSeconds: 0 });

module.exports = model(`Todo`, todoSchema);
