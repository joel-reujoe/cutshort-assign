const crypto = require('crypto');
const { server: { ENCRYPTION_KEY, IV_KEY } } = require('../constants');

const setEncrypted = (field) => {
	const buffIv = Buffer.from(ENCRYPTION_KEY, 'hex');
	if (!field) return '';
	
	const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(IV_KEY, 'hex'), buffIv);
	let encrypted = cipher.update(field);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return encrypted.toString('hex');
	
};

const getDecrypted = (field) => {
	if(!field) return '';
	
	try {
		const buffIv = Buffer.from(ENCRYPTION_KEY, 'hex');
		const encryptedText = Buffer.from(field, 'hex');
		const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(IV_KEY, 'hex'), buffIv);
		let decrypted = decipher.update(encryptedText);
		decrypted = Buffer.concat([decrypted, decipher.final()]);
		return decrypted.toString();
	} catch (e) {
		return field;
	}
};

module.exports = {
	setEncrypted,
	getDecrypted,
};