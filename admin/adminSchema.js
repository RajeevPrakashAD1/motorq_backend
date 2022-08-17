const mongoose = require('mongoose');
const validator = require('validator');

const crypto = require('crypto');

const adminSchema = new mongoose.Schema({
	phoneNumber: {
		type: String,
		required: true,

		unique: true
	},

	password: { type: String, required: true }
});
const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
