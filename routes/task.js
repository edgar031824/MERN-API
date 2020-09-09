const express = require('express');
const route = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/authMiddleware');
const checkProject = require('../middlewares/checkProjectMiddleware');
const { check } = require('express-validator');

//api/task
//create a new task
route.post('/',
	//validate errors in the requests
	[
		check('name', 'name is mandatory').notEmpty(),
		check('project', 'project is mandatory').notEmpty(),
	],
	auth,
	checkProject,
	taskController.createTask
);

// get all tasks
route.get('/',
	auth,
	checkProject,
	taskController.getTasks
);
// update task
route.put('/',
	auth,
	checkProject,
	taskController.updateTask
);
// delete task
route.delete('/:id',
	auth,
	checkProject,
	taskController.deleteTask
);

module.exports = route;