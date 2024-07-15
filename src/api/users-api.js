const express = require("express");
const router = express.Router();

const auth = require('../middlewares/authorization/user-auth');

const {
  validateUser,
  validateUserLogin,
  validateUserSubscription
} = require("../middlewares/validators/users-validators");

const {
  upload,
  validateAndTransformUserAvatar,
} = require("../middlewares/images/images-midd");

const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  setUserSubscription,
  setUserAvatar
} = require("../controllers/users-controller");

// REGISTER user =================================
router.post("/users/signup", validateUser, registerUser);

// LOGIN user =================================
router.post("/users/login", validateUserLogin, loginUser);

// LOGOUT user =================================
router.get("/users/logout", auth, logoutUser);

// GET current user =================================
router.get("/users/current", auth, getCurrentUser);

// SET user subscription =================================
router.patch("/users", auth, validateUserSubscription, setUserSubscription);

// SET user avatar =================================
router.patch(
  "/users/avatars",
  auth,
  upload.single("avatar"),
  validateAndTransformUserAvatar,
  setUserAvatar
);

module.exports = router;
