

const checkRole = async(req, _res, next)=>{
	let { id } = req.params;
	let { user } = req;

	try{
		if(user.role === 'admin' || user.id === id){
			next();
		}
		else {
			throw new Error('Operation not permitted. Requires admin access');
		}
	}catch(e){
		next(e);
	}
};

module.exports = checkRole;