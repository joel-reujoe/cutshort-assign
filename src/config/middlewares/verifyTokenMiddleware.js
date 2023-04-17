


const { UniversalFunctions: { verifyToken } } = require('../../utilities');
const verifyTokenMiddleware = async(req, res, next) => {
	let { headers: { authorization: token} } = req;
	try{
		if(!token) throw new Error('Please provide auth token');
		token = token.split(' ')[1];

		let response = await verifyToken(token);
		req.user = response;
	}catch(e){
		next(e);
	}
	next();
};


module.exports = {
	verifyTokenMiddleware,
};