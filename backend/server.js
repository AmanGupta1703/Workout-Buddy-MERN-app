require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const workoutRoutes = require("./routes/workouts");

// ? Create express app
const app = express();

// ? Port
const port = process.env.PORT;

// middleware
app.use(express.json()); // ?
app.use(function (req, res, next) {
	console.log(req.path, req.method);
	next();
});

// routes
app.use("/api/workouts", workoutRoutes); // attach all the router to the app

// connect to the database
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		// ? Listen to port
		app.listen(port, () => {
			console.log(
				`connected to db & app listening at http://localhost:${port}`
			);
		});
	})
	.catch((error) => console.log(error));
