const express = require("express");
const router = express.Router();

const auth = require('../middlewares/authorization/user-auth');

const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  setUserSubscription
} = require("../controllers/users-controller");

const {
  validateUser,
  validateLoginUser,
  validateSubscription
} = require("../middlewares/validators/users-validators");

// REGISTER user =================================
router.post("/users/signup", validateUser, registerUser);

// LOGIN user =================================
router.post("/users/login", validateLoginUser, loginUser);

// LOGOUT user =================================
router.get("/users/logout", auth, logoutUser);

// GET current user =================================
router.get("/users/current", auth, getCurrentUser);

// SET user subscription =================================
router.patch("/users", auth, validateSubscription, setUserSubscription);

module.exports = router;
