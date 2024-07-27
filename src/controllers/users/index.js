const registerUser = require('./registerUser');
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const getCurrentUser = require("./getCurrentUser");
const setUserSubscription = require("./setUserSubscription");
const setUserAvatar = require("./setUserAvatar");
const resendVerificationEmail = require("./resendVerificationEmail");
const verifyUserByToken = require("./verifyUserByToken");

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  setUserSubscription,
  setUserAvatar,
  resendVerificationEmail,
  verifyUserByToken,
};