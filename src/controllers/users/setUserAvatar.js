const path = require("path");

const { setUserKey } = require("../../services/users-services");

const setUserAvatar = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { filename } = req.file;

    if (!filename) {
      return res.status(400).json({ message: "Miss avatar url parameter" });
    }

    const avatarURL = path.join("avatars", filename);
    const user = await setUserKey(userId, { avatarURL: avatarURL });

    return res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        avatarURL: user.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = setUserAvatar;
