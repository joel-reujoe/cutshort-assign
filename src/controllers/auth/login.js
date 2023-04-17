/**
 * login.js
*/

`use strict`;

const { User: UserService, Auth: AuthService } = require(`../../services`);
const { UniversalFunctions: { generateToken, deleteUnnecessaryUserData, generateRefreshToken } } = require(`../../utilities`);

const login = async (payload) => {
	let { email, password } = payload;

	let user = await UserService.getOne({ email, password });
	
	if (!user) throw new Error('Please sign up');

	const token = generateToken({ _id: user._id, role: user.role });
	const refreshToken = generateRefreshToken({_id: user._id}, '31536000000s');
	user.accessToken = token;
	user.refreshToken = refreshToken;

	const validTill = new Date(Date.now() + (31536000000));
	await AuthService.create({ userId: user._id, token, validTill, refreshToken }, { upsert: true });

	

	return deleteUnnecessaryUserData(user);
};

module.exports = login;
