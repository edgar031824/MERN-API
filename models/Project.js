const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'userModel'
	},
	created: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('project', userSchema);