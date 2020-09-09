const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

//api/user
route.post('/createUser', [
	//validate errors in the request s
	check('name', 'name is mandatory').notEmpty(),
	check('email', 'invalid email').isEmail(),
	check('password', 'must have at least 6 characters').isLength({ min: 6 })
], userController.createUser);

module.exports = route;