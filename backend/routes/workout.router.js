const express = require("express");
const router = express.Router();
const WorkoutsController = require("../controllers/workouts.controller");
const authMiddleware = require("../middleware/auth.middleware");

/* /workouts/path */

// List all workouts
router.get("/list", authMiddleware, WorkoutsController.listAllWorkouts);

// List one workout
router.get("/list/:id", authMiddleware, WorkoutsController.listOneWorkout);

// List all workouts from one coach
router.get(
  "/list/coach/:coachId",
  authMiddleware,
  WorkoutsController.listWorkoutsByCoach
);

// Create one workout
router.post("/create", authMiddleware, WorkoutsController.createWorkout);

// Update one workout
router.put("/update/:id", authMiddleware, WorkoutsController.updateWorkout);

// Delete one workout
router.delete("/delete/:id", authMiddleware, WorkoutsController.deleteWorkout);

// Create one exercise in one day of one workout
router.post(
  "/create/:workoutId/:dayId",
  authMiddleware,
  WorkoutsController.createExercise
);

// Update one exercise in one day of one workout
router.put(
  "/update/:workoutId/:dayId/:exerciseId",
  authMiddleware,
  WorkoutsController.updateExercise
);

// Delete one exercise in one day of one workout
router.delete(
  "/delete/:workoutId/:dayId/:exerciseId",
  authMiddleware,
  WorkoutsController.deleteOneExercise
);

// Delete one day from one workout
router.delete(
  "/delete/:workoutId/:dayId",
  authMiddleware,
  WorkoutsController.deleteOneDay
);

// List all workouts assigned to a user
router.get(
  "/list/assigned/:userId",
  authMiddleware,
  WorkoutsController.listAssignedWorkouts
);

// Add one day to one workout
router.post("/add/:workoutId", authMiddleware, WorkoutsController.addDay);

// Assign one workout to one user
router.put(
  "/assign/:workoutId/:userId",
  authMiddleware,
  WorkoutsController.assignWorkoutToUser
);

// Unassign one workout from one user
router.put(
  "/unassign/:workoutId/:userId",
  authMiddleware,
  WorkoutsController.unassignWorkoutFromUser
);

module.exports = router;
