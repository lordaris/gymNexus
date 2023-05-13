const mongoose = require("mongoose");
const { Workout } = require("../models/workout.model");
const User = require("../models/user.model");

// GET all workouts
async function listAllWorkouts(req, res) {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// GET one workout based on id
async function listOneWorkout(req, res) {
  try {
    const workout = await Workout.findById(req.params.id);
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// GET all workouts from one coach
async function listWorkoutsByCoach(req, res) {
  const { coachId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(coachId)) {
    return res.status(404).json({ message: "No coach with this id!" });
  }

  try {
    const workouts = await Workout.find({ coach: coachId }).sort({
      createdAt: -1,
    });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// POST one workout
async function createWorkout(req, res) {
  try {
    const workout = new Workout({
      coach: req.body.coach,
      assignedTo: req.body.assignedTo,
      name: req.body.name,
      days: req.body.days,
    });
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// DELETE one workout
async function deleteWorkout(req, res) {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    if (workout.coach != req.user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this workout!" });
    }

    await Workout.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// DELETE one exercise from a specific day in a workout
async function deleteOneExercise(req, res) {
  try {
    const { workoutId, dayId, exerciseId } = req.params;
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    } else if (workout.coach != req.user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this workout!" });
    } else {
      const day = workout.days.id(dayId);
      if (!day) {
        return res.status(404).json({ error: "Day not found" });
      } else {
        const exercise = day.exercises.id(exerciseId);
        if (!exercise) {
          return res.status(404).json({ error: "Exercise not found" });
        } else {
          // Delete exercise from day
          day.exercises.pull(exerciseId);
          await workout.save();

          res.status(200).json({ message: "Exercise deleted successfully" });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete one day from a workout
async function deleteOneDay(req, res) {
  try {
    const { workoutId, dayId } = req.params;
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    } else if (workout.coach != req.user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this workout!" });
    } else {
      const day = workout.days.id(dayId);
      if (!day) {
        return res.status(404).json({ error: "Day not found" });
      } else {
        // Delete day from workout
        workout.days.pull(dayId);
        await workout.save();

        res.status(200).json({ message: "Day deleted successfully" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// PUT one workout
async function updateWorkout(req, res) {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    if (workout.coach != req.user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this workout!" });
    }
    await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// ADD one day to a workout
async function addDay(req, res) {
  try {
    const { workoutId } = req.params;
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    } else if (workout.coach != req.user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this workout!" });
    } else {
      workout.days.push(req.body);
      await workout.save();
      res.status(201).json(workout.days[workout.days.length - 1]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// POST one exercise for a specific day in a workout
async function createExercise(req, res) {
  const { workoutId, dayId } = req.params;
  const { name, sets, reps, cadence, notes, video } = req.body;
  try {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }
    const day = workout.days.id(dayId);
    if (!day) {
      return res.status(404).json({ error: "Day not found" });
    }
    day.exercises.push({ name, sets, reps, cadence, notes, video });
    await workout.save();
    res.status(201).json(day.exercises[day.exercises.length - 1]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

// PUT one exercise for a specific day in a workout
async function updateExercise(req, res) {
  const { workoutId, dayId, exerciseId } = req.params;
  const { name, sets, reps, cadence, notes, video } = req.body;
  try {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }
    const day = workout.days.id(dayId);
    if (!day) {
      return res.status(404).json({ error: "Day not found" });
    }
    const exercise = day.exercises.id(exerciseId);
    if (!exercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    exercise.set({ name, sets, reps, cadence, notes, video });
    await workout.save();
    res.status(200).json(exercise);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

// GET all workouts assigned to a specific user
async function listAssignedWorkouts(req, res) {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ message: "No user with this id!" });
  }

  try {
    const workouts = await Workout.find({ assignedTo: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Assign a workout to a user
async function assignWorkoutToUser(req, res) {
  try {
    const { workoutId, userId } = req.params;

    const workout = await Workout.findById(workoutId);

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (workout.assignedTo.includes(userId)) {
      return res
        .status(400)
        .json({ error: "User already assigned to this workout" });
    }

    workout.assignedTo.push(userId);
    await workout.save();

    res.json({ message: "User assigned to workout successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Unassign a workout from a user
async function unassignWorkoutFromUser(req, res) {
  try {
    const { workoutId, userId } = req.params;

    const workout = await Workout.findById(workoutId);

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!workout.assignedTo.includes(userId)) {
      return res
        .status(400)
        .json({ error: "User not assigned to this workout" });
    }

    workout.assignedTo.pull(userId);
    await workout.save();

    res.json({ message: "User unassigned from workout successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createWorkout,
  listAllWorkouts,
  listOneWorkout,
  deleteWorkout,
  updateWorkout,
  createExercise,
  updateExercise,
  listWorkoutsByCoach,
  listAssignedWorkouts,
  deleteOneExercise,
  deleteOneDay,
  addDay,
  assignWorkoutToUser,
  unassignWorkoutFromUser,
};
