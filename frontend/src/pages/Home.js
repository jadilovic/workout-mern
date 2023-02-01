import { useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
	// const [workouts, setWorkouts] = useState(null);
	const { workouts, dispatch } = useWorkoutsContext();
	const { user } = useAuthContext();
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/api/workouts', {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});
			const workoutData = await response.json();
			console.log(workoutData);

			if (response.ok) {
				dispatch({ type: 'SET_WORKOUTS', payload: workoutData });
			}
		};
		if (user) {
			fetchData();
		}
	}, [dispatch, user]);

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
