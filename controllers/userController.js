const userModel = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res, next) => {
	//validate errors from the route
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const { password, email } = req.body;
	try {
		let user = null;
		// checks whether the user exists
		user = await userModel.findOne({ email });
		if (user) {
			res.status(400).json({ msg: 'The register already exists' });
			return;
		}
		const userInstance = new userModel(req.body);
		//generate hash for the pass
		const salt = await bcryptjs.genSalt(10);
		userInstance.password = await bcryptjs.hash(password, salt);
		// saves the user as a collection in the DB
		await userInstance.save();

		/* generate the token based in the user id from stored in the db,
		its necessary create the payload and then sign it */
		const payload = {
			user: {
				id: userInstance.id
			}
		}

		jwt.sign(payload, process.env.TOKEN, {
			/* expiresIn: 3600 */
		}, (error, token) => {
			if (error) throw (error);

			res.status(200).json({ token });
		});
	} catch (error) {
		res.status(400).send(error);
	}
};