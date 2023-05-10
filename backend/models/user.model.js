const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // removes whitespace from beginning and end before saving to db
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["COACH", "ATHLETE"],
    default: "COACH",
  },
  addedBy: {
    type: Schema.Types.ObjectId,
  },
});

// Static createuser method
userSchema.statics.signup = async function (email, password, role, addedBy) {
  // Validation
  if (!email || !password || !role) {
    throw Error("Email, password and role are required");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password is not strong enough. It must contain at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol"
    );
  }
  if (!["COACH", "ATHLETE"].includes(role)) {
    throw Error("Role must be either COACH or ATHLETE");
  }

  const exist = await this.findOne({ email });
  if (exist) {
    throw Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, role, addedBy });

  return user;
};

// Static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Email and password are required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Wrong credentials");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Wrong credentials");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
