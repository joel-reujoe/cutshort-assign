/**
 * server.js
*/

`use strict`;

require(`dotenv`).config();

module.exports = {
	NODE_ENV: process.env.NODE_ENV || `development`,
	PORT: process.env.PORT || 8000,
	JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || `joeldsouza`,
	JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY || `joeldsouza_refresh`,
	ROLLBAR_ACCESS_TOKEN: process.env.ROLLBAR_ACCESS_TOKEN || ``,
	SENTRY_DSN: process.env.SENTRY_DSN || ``,
	SERVICE_ACCOUNT: process.env.SERVICE_ACCOUNT,
	ENVIRONMENT: process.env.ENVIRONMENT || 'production',
	TOPIC: process.env.TOPIC,
	IV_KEY: process.env.IV_KEY || '4029a82f032df20df6b29291d5f9990b04160fac1433a5a5e45deb6e46b533a0',
	ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || 'b2f86d2447e14b324676250495aa1697',
};
