const { getUser } = require("../../services/users-services");
const { sendVerifyEmail } = require("../../utils/email-utils");

const resendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await getUser({ email: email });

    if (!user) {
      return res.status(401).json({ message: "No such user" });
    }

    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }
    await sendVerifyEmail(email, user.verificationToken);
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerificationEmail;
