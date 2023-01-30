const express = require('express');
const {
	getWorkouts,
	getSingleWorkout,
	createNewWorkout,
	deleteWorkout,
	updateWorkout,
} = require('../controllers/workoutController');

const router = express.Router();

router.get('/', getWorkouts);
router.get('/:id', getSingleWorkout);
router.post('/', createNewWorkout);
router.delete('/:id', deleteWorkout);
router.patch('/:id', updateWorkout);

module.exports = router;
