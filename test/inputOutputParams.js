

module.exports = {
	registerData: {
		inputParams: {
			case1: {
				'email':"joel.rdsouza7@yahoo.in",
				'password':'joeldsouza',
			},
		},
		ouput: { 
			case1: {
				isAdmin: false,
				isActive: true,
				role: "member",
			},
		},
	},

	loginData: {
		inputParams:{
			case1: {
				'email':"joel.rdsouza7@yahoo.in",
				'password':'frankcastle',
			},
			case2: {
				'email':"joel.rdsouza7@yahoo.in",
				'password':'joeldsouza',
			},
		},
		output:{
			case1:{        
				"isAdmin": false,
				"isActive": false,
				role: "member",
			},
		},
	},

	userPostsData:{
		inputParams:{
			case1: {
				id: '646a9197bfa15a17ada91716',
			},
			case2: {
				id:'646a9197bfa15a17ada91716',
				page: 1,
				limit: 1,
			},
		},
	},

	userTodosData: {
		inputParams:{
			case1: {
				id: '646a9197bfa15a17ada91716',
			},
			case2: {
				id:'646a9197bfa15a17ada91716',
				page: 1,
				limit: 1,
			},
		},
	},

	getTodoData:{
		inputParams: {
			case1: {
				id:'646a8b54b4c07dff6d707b25',
			},
		},
	},

	getTodosData:{
		inputParams: {
			case1: {},
			case2: { page: 1, limit: 1},
		},
	},

	getPostData:{
		inputParams: {
			case1: {
				id:'646a882d310402fac5462c9b',
			},
		},
	},

	getPostsData:{
		inputParams: {
			case1: {},
			case2: { page: 1, limit: 1},
		},
	},

	getCommentsData:{
		inputParams: {
			case1: {
				id:'646a874f7f791033f4d72d5d',
			},
			case2: { 
				id:'646a874f7f791033f4d72d5d',
				page: 1, 
				limit: 1,
			},
		},
	},

	getUserData:{
		inputParams: {
			case1: {
				id:'643c1c701942e1b647aaff27',
			},
		},
	},

	getUsersData:{
		inputParams: {
			case1: {},
			case2: { page: 1, limit:1 },
		},
	},
};