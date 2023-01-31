import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const WorkoutForm = () => {
	const [workout, setWorkout] = useState({
		title: '',
		reps: '',
		load: '',
	});
	const [error, setError] = useState(null);
	const [emptyFields, setEmptyFields] = useState([]);
	const { dispatch } = useWorkoutsContext();

	const addData = (e) => {
		e.preventDefault();
		setWorkout({
			...workout,
			[e.target.name]: e.target.value,
		});
	};

	const submitData = async (e) => {
		e.preventDefault();
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
			setEmptyFields([...newWorkout.emptyFields]);
		}
		if (!newWorkout.message) {
			dispatch({ type: 'CREATE_WORKOUT', payload: newWorkout });
			setWorkout({ title: '', reps: '', load: '' });
			setError(null);
			setEmptyFields([]);
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
					className={emptyFields.includes('title') ? 'error' : ''}
				/>
				<label htmlFor="reps">Reps: </label>
				<input
					type="number"
					name="reps"
					value={workout.reps}
					onChange={addData}
					className={emptyFields.includes('reps') ? 'error' : ''}
				/>
				<label htmlFor="load">Load in kg: </label>
				<input
					type="number"
					name="load"
					value={workout.load}
					onChange={addData}
					className={emptyFields.includes('load') ? 'error' : ''}
				/>
				<button type="submit">Add Workout</button>
				{error && <div className="error">{error}</div>}
			</form>
		</div>
	);
};
export default WorkoutForm;
