const Joi = require("joi");

const { regexpName, regexpPhone } = require('./regexp');

const contactSchema = Joi.object({
  name: Joi.string().regex(regexpName).min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().regex(regexpPhone).required(),
  favorite: Joi.boolean(),
});

const statusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const validateContact = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const validateContactStatus = (req, res, next) => {
  const { error } = statusSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = { validateContact, validateContactStatus };
