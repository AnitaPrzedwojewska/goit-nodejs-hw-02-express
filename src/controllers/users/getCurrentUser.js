const getCurrentUser = async (req, res, next) => {
  return res.status(200).json({
    user: {
      _id: req.user._id,
      email: req.user.email,
      subscription: req.user.subscription,
    },
  });
};

module.exports = getCurrentUser;