const mongoose = require('mongoose');

const RegisteredUser = require('./userSchema');
const event = require('./../events/eventSchema');
// const admin = require('./userSchema');
const upload = require('../util/multer');

const AppError = require('../util/errorCreating');
const Admin = require('../admin/adminSchema');
const { v4: uuidv4 } = require('uuid');

const catchAsync = (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((err) => next(err));
	};
};

exports.createUser = catchAsync(async (req, res, next) => {
	const newUser = await RegisteredUser.create({
		name: req.body.name,
		phoneNumber: req.body.phoneNumber,
		age: req.body.age,
		gender: req.body.gender,
		password: req.body.password
	});

	res.status(200).send({
		status: 'successful',
		data: {
			user: newUser
		}
	});
});

exports.getAllUsers = async (req, res) => {
	try {
		const allUser = await RegisteredUser.find();
		res.status(200).send({ status: 'successful', data: allUser });
	} catch (err) {
		res.status(500).send({ status: fail, error: err });
	}
};

exports.getOneUser = async (req, res) => {
	// console.log(req, body);
	try {
		const user = await RegisteredUser.findOne({ phoneNumber: req.body.phoneNumber });
		res.status(200).send({ status: 'successful', data: user });
	} catch (err) {
		res.status(500).send({ status: fail, error: err });
	}
};

exports.loginUser = async (req, res) => {
	//console.log(req.body);
	try {
		const user = await RegisteredUser.findOne({ phoneNumber: req.body.phoneNumber });
		//console.log(user);
		if (!user) {
			return res.status(401).send({ status: 'fail', message: 'Invalid phone number' });
		}
		if (req.body.password == user.password) {
			return res.status(200).send({ message: 'successful', data: user });
		}
	} catch (err) {
		res.status(500).send({ status: 'fail', error: err });
	}
};

exports.loginAdmin = async (req, res) => {
	try {
		const user = await Admin.findOne({ phoneNumber: req.body.phoneNumber });
		//console.log(user);
		if (!user) {
			return res.status(401).send({ status: 'fail', message: 'Invalid phone number' });
		}
		if (req.body.password == user.password) {
			return res.status(200).send({ message: 'successful', data: user });
		} else {
			return res.status(500).send({ message: 'fail', error: 'Invalid password' });
		}
	} catch (err) {
		res.status(505).send({ status: 'fail', error: err });
	}
};

exports.registerEvent = async (req, res) => {
	try {
		const newId = uuidv4();
		RegisteredUser.updateOne(
			{ phoneNumber: req.body.phoneNumber },
			{ $push: { events: [ req.body.eventName ] } },
			function(err, result) {
				if (err) {
					res.send(err);
				} else {
					event.updateOne(
						{ eventName: req.body.eventName },
						{
							$inc: { candidatesRegistered: +1 },

							$push: { ids: { id: newId, phoneNumber: req.body.phoneNumber } }
						},
						function(err, result) {
							if (err) {
								res.send(err);
							} else {
								res.send(newId);
							}
						}
					);
				}
			}
		);
	} catch (err) {
		res.status(500).send({ status: 'fail', error: err });
	}
};

exports.getRegisteredEvents = async (req, res) => {
	try {
		const allevent = await RegisteredUser.find({ phoneNumber: req.body.phoneNumber });
		//console.log(allevent);
		res.status(200).send({ status: 'successful', data: allevent[0].events });
	} catch (err) {
		res.status(400).send({ status: 'fail', error: err });
	}
};

exports.deregisterEvent = async (req, res) => {
	try {
		RegisteredUser.updateOne(
			{ phoneNumber: req.body.phoneNumber },
			{ $pull: { events: req.body.eventName } },
			function(err, result) {
				if (err) {
					res.send(err);
				} else {
					event.updateOne(
						{ eventName: req.body.eventName },
						{
							$inc: { candidatesRegistered: -1 },
							$pull: { ids: { phoneNumber: req.body.phoneNumber } }
						},
						function(err, result) {
							if (err) {
								res.send(err);
							} else {
								res.send('decrease successfully');
							}
						}
					);
				}
			}
		);
	} catch (err) {
		res.status(500).send({ status: 'fail', error: err });
	}
};

exports.verify = async (req, res) => {
	console.log(req.body);
	try {
		const Oneevent = await event.findOne({ eventName: req.body.eventName });
		console.log(Oneevent.ids);
		const object = Oneevent.ids.find((element) => {
			if (element.id === req.body.id) {
				return true;
			}
		});
		if (object) {
			event.updateOne({ eventName: req.body.eventName }, { $pull: { ids: { id: req.body.id } } }, function(
				err,
				result
			) {
				if (err) {
					res.send(err);
				} else {
					res.send('verified successfully');
				}
			});
		} else {
			res.status(500).send({ status: 'fail', error: 'Invalid code' });
		}
	} catch (err) {
		res.status(502).send({ status: 'fail', error: err });
	}
};
