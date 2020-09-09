const projectModel = require('../models/Project');

const checkProject = async (req, res, next) => {
	try {
		const { project } = Object.keys(req.body).length ? req.body : req.query;
		const storedProject = await projectModel.findById(project);

		// check whether the project exist
		if (!storedProject) {
			return res.status(404).json({ msg: 'project not found' });
		}
		//check whether the project belongs the user
		if (storedProject.author.toString() !== req.author.id) {
			return res.status(401).json({ msg: 'unathorized' });
		}
		next();
	} catch (error) {
		res.status(400).json({ error });
	}
};

module.exports = checkProject;