const express = require("express");
const router = express.Router();

const auth = require('../middlewares/authorization/user-auth');
const verifyUser = require('../middlewares/verification/users-verification');
const {
  validateUser,
  validateUserLogin,
  validateUserSubscription,
  validateUserEmail
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
  setUserAvatar,
  resendVerificationEmail,
  verifyUserByToken
} = require("../controllers/users/index");

// REGISTER user =================================
router.post("/users/signup", validateUser, registerUser);

// LOGIN user =================================
router.post("/users/login", validateUserLogin, verifyUser, loginUser);

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

// VERIFY user
router.get("/users/verify/:verificationToken", verifyUserByToken);

// RESEND user verification token
router.post("/users/verify", validateUserEmail, resendVerificationEmail);

module.exports = router;
