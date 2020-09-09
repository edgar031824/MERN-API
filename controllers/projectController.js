const projectModel = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {
	//validate errors from the route
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const projectInstance = new projectModel(req.body);
		// add the author previously set in the middleware based on the token validation
		projectInstance.author = req.author.id;
		await projectInstance.save();
		res.status(200).json({ project: projectInstance });
	} catch (error) {
		res.status(400).json({ error });
	}
};

exports.getProjects = async (req, res) => {
	try {
		const projects = await projectModel.find({ author: req.author.id });
		if (projects) {
			res.status(200).json({ projects });
		}

	} catch (error) {
		res.status(400).json({ error });
	}
};

exports.updateProject = async (req, res) => {

	const { name } = req.body;
	const newProject = {};

	if (name) {
		newProject.name = name;
	}
	try {
		// check whether the project exists
		let project = await projectModel.findOne({ _id: req.params.id });
		if (!project) {
			return res.status(404).json({ msg: 'project not found' });
		}

		//check whether the project belongs the user
		if (project.author.toString() !== req.author.id) {
			return res.status(401).json({ msg: 'unathorized' });
		}

		// update the project
		project = await projectModel.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true });
		res.status(200).json({ project });

	} catch (error) {
		res.status(400).json({ error });
	}
};

exports.deleteProject = async (req, res) => {
	try {
		// check whether the project exists
		let project = await projectModel.findOne({ _id: req.params.id });
		if (!project) {
			return res.status(404).json({ msg: 'project not found' });
		}

		//check whether the project belongs the user
		if (project.author.toString() !== req.author.id) {
			return res.status(401).json({ msg: 'unathorized' });
		}

		// delete the project
		await projectModel.findOneAndRemove({ _id: req.params.id });

		res.status(200).json({ msg: 'The project has been deleted' });

	} catch (error) {
		res.status(400).json({ error });
	}
};
