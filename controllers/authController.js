const userModel = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.AuthUser = async (req, res, next) => {
	//validate errors from the route
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { email, password } = req.body;

	try {
		let user = null;
		// checks whether the user exists
		user = await userModel.findOne({ email });
		if (!user) {
			res.status(400).json({ msg: 'The user does not exist' });
		}
		// compare the request password with the stored password to see if it's valid
		let storedPassword = await bcryptjs.compare(password, user.password);

		if (!storedPassword) {
			res.status(400).json({ msg: 'Incorrect password' });
			return;
		}

		/* generate the token based in the user id from stored in the db,
		its necessary create the payload and then sign it */
		const payload = {
			user: {
				id: user.id
			}
		}

		jwt.sign(payload, process.env.TOKEN, {
			/* expiresIn: 3600 */
		}, (error, token) => {
			console.log(token);
			if (error) throw (error);

			res.json({ token });
		});
	}
	catch (error) {
		res.status(400).send(error);
	}
};

exports.authenticatedUser = async (req, res, next) => {
	try {
		const user = await userModel.findById(req.author.id);
		console.log(user);
		res.status(200).json({ user });
	} catch (error) {
		res.status(400).json({ msg: 'Not authenticated user' });
	}
}