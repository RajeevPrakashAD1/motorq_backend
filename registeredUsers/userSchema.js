const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String,
		required: true,

		unique: true
	},
	age: {
		type: String
	},
	gender: { type: String },
	events: {
		type: Array,
		default: []
	},
	password: { type: String, required: true }
});
const RegisteredUser = mongoose.model('RegisteredUser', userSchema);
module.exports = RegisteredUser;
