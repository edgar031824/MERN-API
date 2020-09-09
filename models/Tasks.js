const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	state: {
		type: Boolean,
		default: false
	},
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'project'
	},
	created: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('task', taskSchema)