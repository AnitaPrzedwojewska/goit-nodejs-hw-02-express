const { getUser } = require("../../services/users-services");

const verifyUserByToken = async (req, res, next) => {
  try {
    const user = await getUser({
      verificationToken: req.params.verificationToken,
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      user.verify = true;
      // delete user.verificationToken;
      user.verificationToken = ' ';
      await user.save();
      res.status(200).json({ message: "Verification successful" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = verifyUserByToken;
