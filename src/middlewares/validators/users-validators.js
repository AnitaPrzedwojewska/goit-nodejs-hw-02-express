const Joi = require("joi");

const userSchema = Joi.object({
  password: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  avatarURL: Joi.string().uri(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string(),
});

const userLoginSchema = Joi.object({
  password: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
});

const userAvatarSchema = Joi.object({
  avatarURL: Joi.string().uri().required(),
});

const userSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateUserLogin = (req, res, next) => {
  const { error } = userLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateUserAvatar = (req, res, next) => {
  const { error } = userAvatarSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateUserSubscription = (req, res, next) => {
  const { error } = userSubscriptionSchema.validate(req.query);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateUser,
  validateUserLogin,
  validateUserAvatar,
  validateUserSubscription,
};
