import { useEffect, useState } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
	const [workouts, setWorkouts] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/api/workouts');
			const workoutData = await response.json();
			setWorkouts(workoutData);
		};
		fetchData();
	}, []);

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
