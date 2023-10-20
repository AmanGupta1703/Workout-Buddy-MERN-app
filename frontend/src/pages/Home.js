import { useEffect } from "react";

import useWorkoutsContext from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

function Home() {
	const { workouts, dispatch } = useWorkoutsContext();

	useEffect(
		function () {
			async function fetchWorkouts() {
				const response = await fetch("/api/workouts");
				const json = await response.json();

				if (response.ok) {
					dispatch({ type: "SET_WORKOUTS", payload: json });
				}
			}
			fetchWorkouts();
		},
		[dispatch]
	); // pass an empty array to avoid useEffect to run on every render

	return (
		<div className="home">
			<div className="workouts">
				{workouts &&
					workouts.map((workout) => (
						<WorkoutDetails key={workout._id} workout={workout} />
					))}
			</div>
			<WorkoutForm />
		</div>
	);
}

export default Home;
