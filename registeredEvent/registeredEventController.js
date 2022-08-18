// const mongoose = require('mongoose');

// //const RegisteredUser = require('./userSchema');
// const RegisteredEvent = require('./registeredEventSchema');
// // const admin = require('./userSchema');
// const upload = require('../util/multer');

// const AppError = require('../util/errorCreating');
// const Admin = require('../admin/adminSchema');

// const catchAsync = (fn) => {
// 	return (req, res, next) => {
// 		fn(req, res, next).catch((err) => next(err));
// 	};
// };

// exports.RegisterForEvent = catchAsync(async (req, res, next) => {
// 	const eventRegister = await RegisteredEvent.create({
// 		eventName: req.body.eventName,
// 		phoneNumber: req.body.phoneNumber
// 	});

// 	res.status(200).send({
// 		status: 'successful',
// 		data: {
// 			event: eventRegister
// 		}
// 	});
// });

// exports.getAllRegisterEvents = async (req, res) => {
// 	try {
// 		const allRegisterEvent = await RegisteredEvent.find();
// 		res.status(200).send({ status: 'successful', data: allRegisterEvent });
// 	} catch (err) {
// 		res.status(500).send({ status: fail, error: err });
// 	}
// };

// // exports.getOneUser = async (req, res) => {
// // 	try {
// // 		const user = await RegisteredUser.findOne({ phoneNumber: req.body.phoneNumber });
// // 		res.status(200).send({ status: 'successful', data: user });
// // 	} catch (err) {
// // 		res.status(500).send({ status: fail, error: err });
// // 	}
// // };

// // exports.loginUser = async (req, res) => {
// // 	//console.log(req.body);
// // 	try {
// // 		const user = await RegisteredUser.findOne({ phoneNumber: req.body.phoneNumber });
// // 		//console.log(user);
// // 		if (!user) {
// // 			return res.status(401).send({ status: 'fail', message: 'Invalid phone number' });
// // 		}
// // 		if (req.body.password == user.password) {
// // 			return res.status(200).send({ message: 'successful', data: user });
// // 		}
// // 	} catch (err) {
// // 		res.status(500).send({ status: 'fail', error: err });
// // 	}
// // };
