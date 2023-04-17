/**
 * index.js
*/

`use strict`;
global.__basedir = __dirname;

try { 
	const nodeVersion = parseInt(process.versions.node);
	if (nodeVersion < 16) throw new Error(`Kindly upgrade Node version to 16 or higher`);

	const { dbInit, serverInit, serverPort } = require(`./app`);

	(async () => {
		try {
			const { mongoose, logging, redisClient } = await dbInit();
			const { connections: [{ host, port, name }] } = mongoose;
			global.logging = logging;
			global.redisClient = redisClient;
			console.info(`DB connected to ${host}:${port}/${name}`);

			const server = await serverInit();
			server.listen(serverPort, () => {
				console.info(`Server listening at http://localhost:${serverPort}`);
			});
		} catch (error) {
			console.error(`Fatal Error:::***>`, (error), `---Fatal Error`);
		}
	})();

	process
		.on(`unhandledRejection`, (err) => {
			console.error(`unhandledRejection===>`, err);
			process.exit(0);
		})
		.on(`uncaughtException`, (err) => {
			console.error(`uncaughtException===>`, err);
			process.exit(1);
		});
}catch(e){
	console.log(e);
}