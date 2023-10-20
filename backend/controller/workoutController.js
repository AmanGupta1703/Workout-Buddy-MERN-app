const mongoose = require("mongoose");
const Workout = require("../models/workoutModel");

// get all workouts
async function getWorkouts(req, res) {
	try {
		const workouts = await Workout.find({}).sort({ createdAt: -1 }); // find all workouts in descending order (meaning the newest workout will be on top)

		res.status(200).json(workouts); // send the workouts back to the client as a response json
	} catch (error) {
		res.status(400).json({ error: error.message }); // if there is an error, send the error as a response json
	}
}

// get a single workout
async function getWorkout(req, res) {
	const { id } = req.params; // grab the id from the request parameters
	try {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).json({ error: "Invalid workout ID" });
		}
		const workout = await Workout.findById(id); // find the workout with the id

		if (!workout) {
			return res.status(404).json({ error: "No such workout found!" });
		}
		res.status(200).json(workout); // send the workout back to the client as a response json
	} catch (error) {
		res.status(400).json({ error: error.message }); // if there is an error, send the error as a response json
	}
}

// create a new workout
async function createWorkout(req, res) {
	// grab the title, load, and reps from the request body
	const { title, load, reps } = req.body;

	let emptyFields = [];

	if (!title) {
		emptyFields.push("title");
	}
	if (!load) {
		emptyFields.push("load");
	}
	if (!reps) {
		emptyFields.push("reps");
	}
	if (emptyFields.length > 0) {
		return res
			.status(400)
			.json({ error: "Please fill in all fields", emptyFields });
	}

	// add document to the database
	try {
		const workout = await Workout.create({ title, load, reps }); // create a new workout
		res.status(200).json(workout); // send the new workout back to the client as a response json
	} catch (error) {
		res.status(400).json({ error: error.message }); // if there is an error, send the error as a response json
	}
}

// delete a workout
async function deleteWorkout(req, res) {
	const { id } = req.params;
	try {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).json({ error: "Invalid workout ID" });
		}
		const workout = await Workout.findOneAndDelete({ _id: id }); // find the workout with the id and delete it
		if (!workout) {
			return res.status(400).json({ error: "No such workout found!" });
		}
		res.status(200).json(workout); // send the deleted workout back to the client as a response json
	} catch (error) {
		res.status(400).json({ error: error.message }); // if there is an error, send the error as a response json
	}
}

// update a workout
async function updateWorkout(req, res) {
	const { id } = req.params;
	try {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).json({ error: "Invalid workout ID" });
		}
		const workout = await Workout.findOneAndUpdate(
			{ _id: id },
			{ ...req.body }
		); // find the workout with the id and update it
		if (!workout) {
			return res.status(400).json({ error: "No such workout found!" });
		}
		res.status(200).json(workout); // send the updated workout back to the client as a response json
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

module.exports = {
	getWorkouts,
	getWorkout,
	createWorkout,
	deleteWorkout,
	updateWorkout,
};
