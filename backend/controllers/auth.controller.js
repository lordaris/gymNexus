// Require
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { Workout } = require("../models/workout.model");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// LoginPage user (POST)
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Create token
    const token = createToken(user._id);
    const role = user.role;
    const id = user._id;
    res.status(200).json({ email, token, role, id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// createuser user (POST)
async function signupUser(req, res) {
  const { email, password, role, addedBy } = req.body;

  try {
    const user = await User.signup(email, password, role, addedBy);

    // Create token
    const token = createToken(user._id);
    const id = user._id;
    res.status(200).json({ id, email, token, addedBy });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// List all users (GET)
async function listAllUsers(req, res) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// List users by coach (GET)
async function listUsersByCoach(req, res) {
  const { coachId } = req.params;

  try {
    const users = await User.find({ addedBy: coachId }).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Get user by ID (GET)
async function listUserById(req, res) {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  loginUser,
  signupUser,
  listAllUsers,
  listUsersByCoach,
  listUserById,
};
