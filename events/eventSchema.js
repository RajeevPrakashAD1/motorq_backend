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
		type: Number,
		required: true
	},
	candidatesRegistered: {
		type: Number,
		default: '0'
	},
	candidates: {
		type: Array,
		default: []
	},
	ids: {
		type: Array,
		default: []
	}
});
const event = mongoose.model('event', eventSchema);
module.exports = event;
