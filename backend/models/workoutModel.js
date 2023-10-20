const mongoose = require("mongoose");

// mongoose allows us to create a schema for our data, mongoDB is schemaless

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		reps: {
			type: Number,
			required: true,
		},
		load: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

// `{}` what should our data look like

module.exports = mongoose.model("Workout", workoutSchema); // ? `Workout` is the name of the collection in the database
