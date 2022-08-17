const mongoose = require('mongoose');

const RegisteredUser = require('./userSchema');
// const admin = require('./userSchema');
const upload = require('../util/multer');

const AppError = require('../util/errorCreating');
const Admin = require('../admin/adminSchema');

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
