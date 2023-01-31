const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		createdAt: true,
	}
);

// static signup method
userSchema.statics.signup = async function (email, password) {
	if (!email || !password) {
		throw Error('Both email and password must be submitted!');
	}
	if (!validator.isEmail(email)) {
		throw Error('Email is not valid!');
	}
	if (!validator.isStrongPassword(password)) {
		throw Error('Password is not valid!');
	}
	const emailExists = await this.findOne({ email });
	if (emailExists) {
		throw Error('Email already in use!');
	}
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	const user = await this.create({ email, password: hash });
	return user;
};

// static login method

userSchema.statics.login = async function (email, password) {
	if (!email || !password) {
		throw Error('Both email and password must be submitted!');
	}
	const user = await this.findOne({ email });
	if (!user) {
		throw Error('Email does not exist!');
	}
	const match = await bcrypt.compare(password, user.password);
	if (!match) {
		throw Error('Incorrect password');
	}
	return user;
};

module.exports = mongoose.model('User', userSchema);
