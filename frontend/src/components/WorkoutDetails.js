import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
	const { _id, title, reps, load, createdAt } = workout;
	const { dispatch } = useWorkoutsContext();
	const handleClick = async () => {
		try {
			const response = await fetch(`/api/workouts/${_id}`, {
				method: 'DELETE',
			});
			const deletedWorkout = await response.json();
			dispatch({ type: 'DELETE_WORKOUT', payload: deletedWorkout });
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<div className="workout-details">
			<h4>{title}</h4>
			<p>
				<strong>Load kg: </strong>
				{load}
			</p>
			<p>
				<strong>Reps: </strong>
				{reps}
			</p>
			<p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
			<span className={'material-symbols-outlined'} onClick={handleClick}>
				delete
			</span>
		</div>
	);
};
export default WorkoutDetails;
