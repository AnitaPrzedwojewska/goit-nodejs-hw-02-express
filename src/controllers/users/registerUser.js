const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const User = require("../../models/users-schema");
const { getUser } = require("../../services/users-services");
const { AVATAR_SIZE } = require("../../constants/constants");
const { sendVerifyEmail } = require("../../utils/email-utils");

const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUser({ email: email });
    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }

    const avatarURL = gravatar.url(email, { s: AVATAR_SIZE });
    const verificationToken = uuidv4();
    const newUser = new User({ email, avatarURL, verificationToken });
    await newUser.setHashPassword(password);

    try {
      await sendVerifyEmail(email, verificationToken);
    } catch (error) {
      return res.status(500).json({ message: "Verification email not send" });
    }
    await newUser.save();

    return res.status(201).json({
      message: "User registered",
      user: {
        email: newUser.email,
        avatarURL: avatarURL,
        subscription: newUser.subscription,
        verificationToken: newUser.verificationToken,
        verify: false
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = registerUser;
