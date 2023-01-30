import { useState } from 'react';

const WorkoutForm = () => {
	const [workout, setWorkout] = useState({
		title: '',
		reps: '',
		load: '',
	});
	const [error, setError] = useState(null);

	console.log(workout);

	const addData = (e) => {
		e.preventDefault();
		setWorkout({
			...workout,
			[e.target.name]: e.target.value,
		});
	};

	const submitData = async (e) => {
		e.preventDefault();
		console.log(workout);
		const response = await fetch('/api/workouts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(workout),
		});
		const newWorkout = await response.json();
		if (newWorkout.message) {
			setError(newWorkout.message);
		}
		if (!newWorkout.message) {
			console.log(newWorkout);
			setWorkout({ title: '', reps: '', load: '' });
			setError(null);
		}
	};

	return (
		<div>
			<form className="create" onSubmit={submitData}>
				<h3>Add a new Workout</h3>
				<label htmlFor="title">Exercise title: </label>
				<input
					type="text"
					name="title"
					id="title"
					value={workout.title}
					onChange={addData}
				/>
				<label htmlFor="reps">Reps: </label>
				<input
					type="number"
					name="reps"
					value={workout.reps}
					onChange={addData}
				/>
				<label htmlFor="load">Load in kg: </label>
				<input
					type="number"
					name="load"
					value={workout.load}
					onChange={addData}
				/>
				<button type="submit">Add Workout</button>
				{error && <div className="error">{error}</div>}
			</form>
		</div>
	);
};
export default WorkoutForm;
