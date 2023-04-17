/* eslint-disable no-undef */
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');
const chaiExclude = require('chai-exclude');
const chaiAsPromised = require('chai-as-promised');
chai.use(deepEqualInAnyOrder);
chai.use(chaiExclude);
chai.use(chaiAsPromised);
const expect = chai.expect;


const { dbInit  } = require('../src/app');

const { 
	Auth: { 
		login,
		register,
	},
	User: { 
		userPosts,
		userTodos,
		getUser,
		getUsers,
	},
	Todo: { 
		getTodo,
		getTodos,
	},
	Post: {
		getPost,
		getPosts,
	},
	Comment: { 
		getComments,
	},
} = require('../src/controllers');

const { 
	registerData,
	loginData,
	userPostsData,
	userTodosData,
	getTodoData,
	getTodosData,
	getCommentsData,
	getUserData,
	getUsersData,
} = require('./inputOutputParams');

describe('CutShort', async()=>{
	before(async () => {
		const { redisClient } = await dbInit();
		global.redisClient = redisClient;
	});

	describe('register', () => {
		it('User Does Not Exist', async() => {
			expect(await register(registerData.inputParams.case1))
				.excluding('createdAt')
				.excluding('updatedAt')
				.excluding('_id')
				.excluding('email')
				.to.deep.equalInAnyOrder(registerData.ouput.case1);
		});
        
		it('User Exists', async()=>{
			try {
				await register(registerData.inputParams.case1);
			}catch(e){
				expect(e).to.exist;
			}
		});
	});

	describe('login', ()=>{
		it('User Does Not Exist', async() => {
			try {
				await login(loginData.inputParams.case1);
			}catch(e){
				expect(e).to.exist;
			}
		});
		it('User Exists', async()=>{
			expect(await login(loginData.inputParams.case2))
				.to.have.property('accessToken');
		});
	});

	describe('userPosts',()=>{
		it('Get User Posts', async()=>{
			userPosts(userPostsData.inputParams.case1).then(result=>{
				expect(result).have.property(`data`).to.not.have.null;
				expect(result.data[0]).to.have.property(`title`);
				expect(result.data[0]).to.have.property(`body`);
				expect(result.data[0]).to.have.property(`userId`);
			});

		});

		it('Get User Posts Pagination', async()=>{
			userPosts(userPostsData.inputParams.case2).then(result=>{
				expect(result).have.property(`data`).to.not.have.null;
				expect(result.data).to.have.length(1);
				expect(result.data[0]).to.have.property(`title`);
				expect(result.data[0]).to.have.property(`body`);
				expect(result.data[0]).to.have.property(`userId`);
			});

		});
	});

	describe('userTodos',()=>{
		it('Get User Todos', async()=>{
			userTodos(userTodosData.inputParams.case1).then(result=>{
				expect(result).have.property(`data`).to.not.have.null;
				expect(result.data[0]).to.have.property(`title`);
				expect(result.data[0]).to.have.property(`userId`);
			});

		});

		it('Get User Todos Pagination', async()=>{
			userTodos(userTodosData.inputParams.case2).then(result=>{
				expect(result).have.property(`data`).to.not.have.null;
				expect(result.data).to.have.length(1);
				expect(result.data[0]).to.have.property(`title`);
				expect(result.data[0]).to.have.property(`userId`);
			});

		});
	});

	describe('getTodo', ()=>{
		it('Get Todo', async()=>{
			getTodo(getTodoData.inputParams.case1).then(result=>{
				expect(result).have.property(`data`).to.not.have.null;
				expect(result.data).to.have.property(`title`);
				expect(result.data).to.have.property(`userId`);
			});
		});
		it('Get Todos', async()=>{
			getTodos(getTodosData.inputParams.case1).then(result=>{
				expect(result).have.property(`data`).to.not.have.null;
				expect(result.data[0]).to.have.property(`title`);
				expect(result.data[0]).to.have.property(`userId`);
			});
		});
		it('Get Todos Pagination', async()=>{
			getTodos(getTodosData.inputParams.case2).then(result=>{
				expect(result).have.property(`data`).to.not.have.null;
				expect(result.data).to.have.length(1);
				expect(result.data[0]).to.have.property(`title`);
				expect(result.data[0]).to.have.property(`userId`);
			});
		});
	});

	describe('getPost', ()=>{
		it('Get Post', async()=>{
			getPost(getTodoData.inputParams.case1).then(result=>{
				expect(result).have.property(`data`).to.not.have.null;
				expect(result.data).to.have.property(`title`);
				expect(result.data).to.have.property(`userId`);
			});
		});
		it('Get Posts', async()=>{
			getPosts(getTodosData.inputParams.case1).then(result=>{
				expect(result).have.property(`data`).to.not.have.null;
				expect(result.data).to.have.length(1);
				expect(result.data[0]).to.have.property(`title`);
				expect(result.data[0]).to.have.property(`userId`);
			});
		});
		it('Get Posts Pagination', async()=>{
			getPosts(getTodosData.inputParams.case2).then(result=>{
				expect(result).have.property(`data`).to.not.have.null;
				expect(result.data[0]).to.have.property(`title`);
				expect(result.data[0]).to.have.property(`userId`);
			});
		});
	});

	describe('getComments', ()=>{
		it('Get Comments', async()=>{
			getComments(getCommentsData.inputParams.case1).then(result=>{
				expect(result).have.property(`data`).to.not.have.null;
				expect(result.data[0]).to.have.property(`title`);
				expect(result.data[0]).to.have.property(`postId`);
				expect(result.data[0].postId).to.equal(getCommentsData.inputParams.case1.id);
			});
		});

		it('Get Comments Pagination', async()=>{
			getComments(getCommentsData.inputParams.case1).then(result=>{
				expect(result).have.property(`data`).to.not.have.null;
				expect(result.data).to.have.length(1);
				expect(result.data[0]).to.have.property(`title`);
				expect(result.data[0]).to.have.property(`postId`);
				expect(result.data[0].postId).to.equal(getCommentsData.inputParams.case1.id);
			});
		});
	});

	describe('getUser', ()=>{
		it('Get User', async()=>{
			getUser(getUserData.inputParams.case1).then(result=>{
				expect(result).have.property(`data`).to.not.have.null;
				expect(result.data).to.have.property(`email`);
				expect(result.data).to.have.property(`password`);
			});
		});

		it('Get Users', async()=>{
			getUsers(getUsersData.inputParams.case1).then(result=>{
				expect(result).have.property(`data`).to.not.have.null;
				expect(result.data).to.have.length(1);
				expect(result.data[0]).to.have.property(`email`);
				expect(result.data[0]).to.have.property(`password`);
			});
		});

		it('Get Users Pagination', async()=>{
			getUsers(getUsersData.inputParams.case2).then(result=>{
				expect(result).have.property(`data`).to.not.have.null;
				expect(result.data).to.have.length(1);
				expect(result.data[0]).to.have.property(`email`);
				expect(result.data[0]).to.have.property(`password`);
			});
		});
	});

	after(function(done) {
		//stop remote servers
		done();
		process.exit(0);
	});
});