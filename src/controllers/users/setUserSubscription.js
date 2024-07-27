const { setUserKey } = require('../../services/users-services');

const setUserSubscription = async (req, res, next) => {
  const userId = req.user._id;
  const { subscription } = req.query;
  if (!subscription) {
    return res.status(400).json({ message: "Miss subscription parameter" });
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

module.exports = setUserSubscription;