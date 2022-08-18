const mongoose = require('mongoose');

//const RegisteredUser = require('./userSchema');
// const admin = require('./userSchema');
const upload = require('../util/multer');
const event = require('./eventSchema');

const catchAsync = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((err) => next(err));
	};
};

exports.createEvent = catchAsync(async (req, res, next) => {
	const newevent = await event.create({
		eventName: req.body.eventName,
		description: req.body.description,
		date: req.body.date,
		startTime: req.body.startTime,
		endTime: req.body.endTime,
		candidatesAllowed: req.body.candidatesAllowed
	});

	res.status(200).send({
		status: 'successful',
		data: {
			event: newevent
		}
	});
});

exports.getAllEvent = async (req, res) => {
	try {
		const allevent = await event.find();
		res.status(200).send({ status: 'successful', data: allevent });
	} catch (err) {
		res.status(500).send({ status: 'fail', error: err });
	}
};

exports.getOneEvent = async (req, res) => {
	// console.log(req.body);
	try {
		const user = await event.findOne({ eventName: req.body.eventName });
		res.status(200).send({ status: 'successful', data: user });
	} catch (err) {
		res.status(500).send({ status: 'fail', error: err });
	}
};

exports.updateEvent = async (req, res) => {
	console.log(req.body);
	try {
		const resp = await event.updateMany(
			{ eventName: req.body.eventName },
			{
				$set: {
					description: req.body.description,
					date: req.body.date,
					startTime: req.body.startTime,
					endTime: req.body.endTime,
					candidatesAllowed: req.body.candidatesAllowed
				}
			}
		);
		res.status(200).send({ status: 'successful', data: resp });
	} catch (e) {
		res.status(500).send({ status: 'fail', error: e });
	}
};

exports.deleteEvent = async (req, res) => {
	try {
		const resp = await event.deleteOne({ eventName: req.body.eventName });
		res.status(200).send({ status: 'successful', data: resp });
	} catch (e) {
		res.status(500).send({ status: 'fail', error: e });
	}
};

// exports.loginUser = async (req, res) => {
// 	//console.log(req.body);
// 	try {
// 		const user = await RegisteredUser.findOne({ phoneNumber: req.body.phoneNumber });
// 		//console.log(user);
// 		if (!user) {
// 			return res.status(401).send({ status: 'fail', message: 'Invalid phone number' });
// 		}
// 		if (req.body.password == user.password) {
// 			return res.status(200).send({ message: 'successful', data: user });
// 		}
// 	} catch (err) {
// 		res.status(500).send({ status: 'fail', error: err });
// 	}
// };
