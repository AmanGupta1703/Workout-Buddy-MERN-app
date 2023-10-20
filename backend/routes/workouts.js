const express = require("express");
const {
	createWorkout,
	getWorkouts,
	getWorkout,
    deleteWorkout,
    updateWorkout,
} = require("../controller/workoutController");

const router = express.Router();

// GET ALL WORKOUTS
router.get("/", getWorkouts);

// GET A SINGLE WORKOUT
router.get("/:id", getWorkout); // /api/workouts/:id => `:id` is a variable (changeable)

// POST A WORKOUT
router.post("/", createWorkout); // ? POST is used to create a new resource

// DELETE A WORKOUT
router.delete("/:id", deleteWorkout); // ? DELETE is used to delete a resource

// UPDATE A WORKOUT
router.patch("/:id", updateWorkout); // ? PATCH is used to update a part of the resource

module.exports = router;
