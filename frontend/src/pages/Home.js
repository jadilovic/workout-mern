import { useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const Home = () => {
	// const [workouts, setWorkouts] = useState(null);
	const { workouts, dispatch } = useWorkoutsContext();

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/api/workouts');
			const workoutData = await response.json();
			if (workoutData) {
				dispatch({ type: 'SET_WORKOUTS', payload: workoutData });
			}
		};
		fetchData();
	}, [dispatch]);

	return (
		<div className="home">
			<div className="workouts">
				{workouts &&
					workouts.map((workout) => {
						return <WorkoutDetails key={workout._id} workout={workout} />;
					})}
			</div>
			<WorkoutForm />
		</div>
	);
};
export default Home;
