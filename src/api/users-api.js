const express = require("express");
const router = express.Router();

const auth = require('../middlewares/authorization/user-auth');

const {
  validateUser,
  validateUserLogin,
  validateUserSubscription
} = require("../middlewares/validators/users-validators");

const { upload }  = require("../middlewares/images/avatars");

const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  setUserSubscription
} = require("../controllers/users-controller");

// REGISTER user =================================
router.post("/users/signup", validateUser, registerUser);

// LOGIN user =================================
router.post("/users/login", validateUserLogin, loginUser);

// CHANGE user avatar =================================
router.patch(
  "/users/avatars",
  upload.single("avatar")
);

// SHOW user avatar
router.get("/users/avatars/:imgPath", (req, res) => {
  const { avatar } = req.params;
  res.render("avatar", { avatar });
});

// LOGOUT user =================================
router.get("/users/logout", auth, logoutUser);

// GET current user =================================
router.get("/users/current", auth, getCurrentUser);

// SET user subscription =================================
router.patch("/users", auth, validateUserSubscription, setUserSubscription);

module.exports = router;
