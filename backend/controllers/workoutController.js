const Workout = require('../models/workoutModel.js');
const mongoose = require('mongoose');

// get all workouts
const getWorkouts = async (req, res, next) => {
	try {
		const workouts = await Workout.find({}).sort({ createdAt: -1 });
		res.status(200).json(workouts);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// get single workout
const getSingleWorkout = async (req, res, next) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ message: 'No such workout' });
	}
	try {
		const workout = await Workout.findById(id);
		if (!workout) {
			return res.status(404).json({ message: `No workout with id : ${id}` });
		}
		res.status(200).json(workout);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// create new workout
const createNewWorkout = async (req, res, next) => {
	const { title, reps, load } = req.body;
	console.log(title, reps, load);
	try {
		const workout = await Workout.create({ title, reps, load });
		res.status(200).json(workout);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// delete workout
const deleteWorkout = async (req, res, next) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ message: 'No such workout to delete' });
	}
	try {
		const deletedWorkout = await Workout.findOneAndDelete({ _id: id });
		if (!deletedWorkout) {
			return res.status(404).json({ message: `No workout with id : ${id}` });
		}
		res.status(200).json(deletedWorkout);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// update workout
const updateWorkout = async (req, res, next) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ message: 'No such workout' });
	}
	try {
		const workout = await Workout.findOneAndUpdate(
			{ _id: id },
			{
				...req.body,
			}
		);
		res.status(200).json(workout);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports = {
	getWorkouts,
	getSingleWorkout,
	createNewWorkout,
	deleteWorkout,
	updateWorkout,
};
