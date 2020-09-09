const express = require('express');
const route = express.Router();
const auth = require('../middlewares/authMiddleware');
const projectController = require('../controllers/projectController');
const { check } = require('express-validator');

//api/project
// create a new project
route.post('/', [
	//validate errors in the request s
	check('name', 'name is mandatory').notEmpty(),
], auth, projectController.createProject);

// get all the projects
route.get('/',
	auth,
	projectController.getProjects
);

//update project
route.put('/:id',
	auth,
	projectController.updateProject);

//delete project
route.delete('/:id',
	auth,
	projectController.deleteProject);

module.exports = route;