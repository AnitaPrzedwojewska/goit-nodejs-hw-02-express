const { setUserKey } = require("../../services/users-services");

const logoutUser = async (req, res, next) => {
  const userId = req.user._id;
  await setUserKey(userId, { token: null });
  return res.status(204).json({
    message: "No content",
  });
};

module.exports = logoutUser;
