const jwt = require("jsonwebtoken");
require('dotenv').config();
const SECRET = process.env.SECRET;
const gravatar = require('gravatar');

const User = require("../models/users-schema");
const { AVATAR_SIZE } = require("../constants/constants");


const { getUser, setUserKey } = require('../services/users-services');

const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUser({ email: email });
    if (user) {
      return res
        .status(409)
        .json({message: "Email in use" });
    }

    const avatarURL = gravatar.url(email, { s: AVATAR_SIZE });

    const newUser = new User({ email, avatarURL });
    await newUser.setHashPassword(password);
    await newUser.save();
    return res.status(201).json({
      message: "User registered",
      user: {
        email: newUser.email,
        avatarURL: avatarURL,
        subscription: newUser.subscription,
      },
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
    id: user.id
  };
  const token = jwt.sign(payload, SECRET, { expiresIn: "1d" });
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

const setUserAvatar = async (req, res, next) => {
  const userId = req.user._id;
  const { avatarURL } = req.query;
  if (!avatarURL) {
    return res.status(400).json({ message: "Miss avatar url parameter" });
  }

  const user = await setUserKey(userId, { avatarURL: avatarURL });

  return res.status(200).json({
    user: {
      _id: user._id,
      email: user.email,
      avatarURL: user.avatarURL,
    },
  });
}

const logoutUser = async (req, res, next) => {
  const userId = req.user._id;
  await setUserKey(userId, { token: null });
  return res.status(204).json({
    message: "No content"
  });
}

const getCurrentUser = async (req, res, next) => {
  return res.status(200).json({
    user: {
      _id: req.user._id,
      email: req.user.email,
      subscription: req.user.subscription,
    },
  });
};

const setUserSubscription = async (req, res, next) => {
  const userId = req.user._id;
  const { subscription } = req.query;
  if (!subscription) {
    return res.status(400).json({message: "Miss subscription parameter"})
  }

  const user = await setUserKey(userId, { subscription: subscription });

  return res.status(200).json({
    user: {
      _id: user._id,
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = {
  registerUser,
  loginUser,
  setUserAvatar,
  logoutUser,
  getCurrentUser,
  setUserSubscription
};
