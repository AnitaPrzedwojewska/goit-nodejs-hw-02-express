const jwt = require("jsonwebtoken");
require('dotenv').config();
const SECRET = process.env.SECRET;

const User = require("../models/users-schema");

const { getUser, setUserKey } = require('../services/users-services');

const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await getUser(email);
    if (user) {
      res
        .status(409)
        .json({message: "Email in use" });
    }

    const newUser = new User({ email });
    await newUser.setHashPassword(password);
    await newUser.save();
    return res
      .status(201)
      .json({
        message: "User registered",
        user: { email: newUser.email, subscription: newUser.subscription },
      });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await getUser({ email: email });

  if (!user) {
    return res
      .status(401)
      .json({ message: "No such user" });
  }

  const isPasswordCorrect = await user.validatePassword(password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Wrong password" });
  }

  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, SECRET, { expiresIn: "15s" });
  const userId = user.id;
  const updatedUser = await setUserKey(userId, { token: token });
  return res.status(200).json({
    token: updatedUser.token,
    user: {
      _id: updatedUser._id,
      email: updatedUser.email,
      subscription: updatedUser.subscription
    },
  });
};

const logoutUser = async (req, res, next) => {
  const { _id } = req.user;
  const user = await getUser({_id: _id});

  if (!user) {
    return res
      .status(401)
      .json({ message: "No such user" });
  }
  const updatedUser = await setUserKey(_id, { token: null });
  console.log('updatedUser: ', updatedUser);
  return res.status(204).json({
    message: "No content"
  });
}

const currentUser = async (req, res, next) => {
// code
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  currentUser
};
