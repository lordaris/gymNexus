const mongoose = require("mongoose");

/* I have multiple schemas so that way I can use their ID in my controllers */

const ExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  cadence: {
    type: String,
  },
  notes: String,
});

const DaySchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  focus: {
    type: String,
    required: true,
  },
  exercises: [ExerciseSchema],
});

const WorkoutSchema = new mongoose.Schema({
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedTo: [
    {
      type: String,
    },
  ],
  name: String,
  days: [DaySchema],
  status: {
    type: String,
    required: true,
    enum: ["ACTIVE", "INACTIVE"],
    default: "ACTIVE",
  },
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = {
  Workout,
};
