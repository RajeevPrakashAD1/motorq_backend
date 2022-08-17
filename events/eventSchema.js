const mongoose = require('mongoose');
const validator = require('validator');

const crypto = require('crypto');

const eventSchema = new mongoose.Schema({
	eventName: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	startTime: {
		type: String,
		required: true
	},
	endTime: {
		type: String,
		required: true
	},
	candidatesAllowed: {
		type: String,
		required: true
	},
	candidatesRegistered: {
		type: String,
		default: '0'
	}
});
const event = mongoose.model('event', eventSchema);
module.exports = event;
