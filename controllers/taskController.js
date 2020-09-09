const taskModel = require('../models/Tasks');
const { validationResult } = require('express-validator');

exports.createTask = async (req, res) => {
	//validate errors from the route
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const taskInstance = new taskModel(req.body);
		await taskInstance.save();
		res.status(200).json({ task: taskInstance });

	} catch (error) {
		res.status(400).json(error);
	}
};

exports.getTasks = async (req, res) => {
	try {
		const { project } = req.query;
		const tasks = await taskModel.find({ project }).sort({ created: -1 });

		if (tasks) {
			res.status(200).json({ tasks });
		}
	} catch (error) {
		res.status(400).json(error);
	}
};

exports.updateTask = async (req, res) => {
	const { name, state, _id } = req.body;
	const newTask = {};

	if (name) {
		newTask.name = name;
	}
	if (Object.keys(req.body).includes('state')) {
		newTask.state = state;
	}

	try {
		// check whether the task exists
		let task = await taskModel.findById(_id);
		if (!task) {
			res.status(404).json({ msg: 'task not found' });
		}

		//update the task
		task = await taskModel.findByIdAndUpdate({ _id }, { $set: newTask }, { new: true });
		res.status(200).json({ task });
	} catch (error) {
		res.status(400).json(error);
	}
};

exports.deleteTask = async (req, res) => {
	try {
		// check whether the task exists
		let task = await taskModel.findById(req.params.id);
		if (!task) {
			res.status(404).json({ msg: 'task not found' });
		}

		await taskModel.findByIdAndRemove({ _id: req.params.id });
		res.status(200).json({ msg: 'Task removed' });

	} catch (error) {
		res.status(400).json(error);
	}
};