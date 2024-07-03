const Joi = require("joi");

const regexpName = /([A-Z])\w+((\s)?([A-Z]\w+))*/;
const regexpEmail = /^[a-zA-Z0-9_.±]+@([\w-]+.)+[\w-]{2,4}$/;
const regexpPhone = /^\+?\d{2,3}(-?\s? ?\d+)*$/;

const contactSchema = Joi.object({
  name: Joi.string().regex(regexpName).min(3).max(30).required(),
  email: Joi.string().email().regex(regexpEmail).required(),
  phone: Joi.string().regex(regexpPhone).required(),
  favorite: Joi.boolean(),
});

const statusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = (schema, obj, res, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

const validateContact = (req, res, next) => {
  return validate(contactSchema, req.body, res, next);
};

const validateContactStatus = (req, res, next) => {
  return validate(statusSchema, req.body, res, next);
};

module.exports = { validateContact, validateContactStatus };