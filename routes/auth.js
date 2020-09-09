const express = require('express');
const route = express.Router();
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const auth = require('../middlewares/authMiddleware');

//auth
route.post('/', [
	//validate errors in the request s
	check('email', 'name is mandatory').notEmpty(),
	check('password', 'must have at least 6 characters').isLength({ min: 6 })
], authController.AuthUser);

// get the authenticated user
route.get('/', [
	auth,
], authController.authenticatedUser);

module.exports = route;