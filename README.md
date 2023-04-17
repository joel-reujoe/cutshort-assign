# cutshort-assign

A NodeJs application with Express framework, MongoDb as database, Mongoose as ODM.  
It uses Joi for schema validation.  
It uses eslint, husky, and lint-staged for code-linting purposes.  
It contains a simple routing example.

## Tech Stack

* [Node.js] - Free, open-sourced, cross-platform JavaScript run-time environment
* [Express] - Fast, unopinionated, minimalist web framework for Node.js 
* [Mongoose] - Elegant MongoDB ODM for node.js
* [Joi] - Schema description language and data validator
* [Swagger] - Collaboration Platform for API Development
* [Redis] - node-redis is a modern, high performance Redis client for Node.js.
* [Mocha] - Mocha is a feature-rich JavaScript test framework running on Node.js 


## Assumptions made
* Admin user can edit other users data like email, password and role
* Users can only comment on other users posts and not todos
* In order to keep the apis other than `/login` and `/register` secure we need to use jwt token and pass it in the header using authoriztion with the format `Bearer {token}` 


## Admin Credentials
`email: joel.rdsouza@yahoo.in`<br />
`password: frankcastle9`

**_NOTE:_** These credentials will be usefull for following api endpoint 
```
curl -X 'PATCH' \
  'http://localhost:8000/user/643c1c701942e1b647aaff27' \
  -H 'accept: application/json' \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNiZmU1NTI4YTc5MzQ2OTUzZDkyNzMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODE2NjM5NzcsImV4cCI6MTY4MTc1MDM3N30.PDlOW4gX47r3OOSutdqMtN6fNyJyqedkjSYCxonb21k' \
  -H 'Content-Type: application/json' \
  -d '{
  "role": "admin"
}'
```

## Running it

> `npm install`

> Copy *.env.sample* as **.env** to root directory, and put appropriate values in it. It is an optional step, application will run using default values if *.env* is not found.

> `npm run start`

## Running test cases

> `npm run test`

**_NOTE:_** Please change the credentials in `inputOutputParams.js` for `registerData` and `loginData` for registration and login test cases to pass


## For api documentation please open the below url
* [CutShort Assignment Link]


[Node.js]: <https://nodejs.dev/>
[Express]: <http://expressjs.com/>
[Mongoose]: <https://mongoosejs.com/>
[Joi]: <https://joi.dev/>
[Swagger]: <https://swagger.io/>
[Redis]: <https://www.npmjs.com/package/redis>
[CutShort Assignment Link]: <https://joelreuben28.onrender.com/api-docs/#/>
[Mocha]: <https://mochajs.org/>


