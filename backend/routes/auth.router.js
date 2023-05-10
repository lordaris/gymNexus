const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/auth.controller");

/* /users/path */

router.post("/login", UsersController.loginUser);
router.post("/signup", UsersController.signupUser);
router.get("/list", UsersController.listAllUsers);
router.get("/list/:coachId", UsersController.listUsersByCoach);
router.get("/:userId", UsersController.listUserById);

module.exports = router;
