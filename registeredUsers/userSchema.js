const mongoose = require('mongoose');
const validator = require('validator');

const crypto = require('crypto');

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
	password: { type: String, required: true }
});
const RegisteredUser = mongoose.model('RegisteredUser', userSchema);
module.exports = RegisteredUser;
