const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const config = require("./config/config").config;

const indexRouter = require("./routes/index");
const workoutsRouter = require("./routes/workout.router");
const authRouter = require("./routes/auth.router");

const app = express();

const mongoose = require("mongoose");

mongoose.Promise = Promise;

// Connect
mongoose.connect(config.mongo.url, config.mongo.connectionOptions);
mongoose.connection.on("open", function () {
  console.log("app.js#MongoConnection", "MongoDB connection opened");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const cors = require("cors");

app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, true);
    },
  })
);

app.use("/", indexRouter);
app.use("/workouts", workoutsRouter);
app.use("/users", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//

module.exports = app;
