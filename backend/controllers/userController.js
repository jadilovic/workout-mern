const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
	return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const userLogin = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		const token = createToken(user._id);
		return res.status(200).json({ email, token });
	} catch (error) {
		console.log(error.message);
		return res.status(400).json({ message: error.message });
	}
};

const userSignup = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.signup(email, password);
		const token = createToken(user._id);
		return res.status(200).json({ email, token });
	} catch (error) {
		console.log(error.message);
		return res.status(400).json({ message: error.message });
	}
};

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({}).sort({ createdAt: -1 });
		res.json(users);
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = { userLogin, userSignup, getAllUsers };
