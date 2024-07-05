const Joi = require("joi");

const userSchema = Joi.object({
  password: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
  token: Joi.string(),
});

const loginUserSchema = Joi.object({
  password: Joi.string().min(3).required(),
  email: Joi.string().email().required()
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateLoginUser = (req, res, next) => {
  const { error } = loginUserSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

module.exports = { validateUser, validateLoginUser };
