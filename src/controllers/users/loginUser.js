const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../../constants/constants");
const { getUser, setUserKey } = require("../../services/users-services");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await getUser({ email: email });

  if (!user) {
    return res.status(401).json({ message: "No such user" });
  }

  const isPasswordCorrect = await user.validatePassword(password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Wrong password" });
  }

  const payload = {
    id: user.id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  const userId = user.id;
  const updatedUser = await setUserKey(userId, { token: token });
  return res.status(200).json({
    token: updatedUser.token,
    user: {
      _id: updatedUser._id,
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  });
};

module.exports = loginUser;
