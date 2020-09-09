const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	const usertoken = req.header('x-auth-token');

	if (!usertoken) {
		res.status(401).json({ error: 'invalid token' });
		return;
	}
	try {
		// compare token with the already stored token that used our secret key when was stored
		const encryptedUser = jwt.verify(usertoken, process.env.TOKEN);
		req.author = encryptedUser.user;
		next();

	} catch (error) {
		res.status(401).json({ error: 'invalid token' });
	}


}

module.exports = auth;