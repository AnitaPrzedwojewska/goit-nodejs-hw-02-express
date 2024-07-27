const { getUser } = require('../../services/users-services');

const verifyUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await getUser({ email: email });
  if (!user) {
    return res.status(401).json({ message: "No such user" });
  }

  if (user.verify) {
    next()
  } else {
    res.status(401).json({message: "Unverificated"})
  }
}

module.exports = verifyUser;