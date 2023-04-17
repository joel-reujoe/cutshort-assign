/**
 * login.js
*/

`use strict`;

const { User: UserService, Auth: AuthService } = require(`../../services`);
const { UniversalFunctions: { deleteUnnecessaryUserData } } = require(`../../utilities`);

const refreshToken = async (payload) => {
	let { token, refreshToken, _id } = payload;

	let user = await UserService.getOne({ _id });
	
	if (!user) throw new Error('Please sign up');
    
	user.accessToken = token;
	user.refreshToken = refreshToken;

	const validTill = new Date(Date.now() + (31536000000)); // 5 minutes
	await AuthService.create({ userId: user._id, token, validTill, refreshToken }, { upsert: true });

	// TODO: Send OTP on Phone Number

	return deleteUnnecessaryUserData(user);
};

module.exports = refreshToken;
