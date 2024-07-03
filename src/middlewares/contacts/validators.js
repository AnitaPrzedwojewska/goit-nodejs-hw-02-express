const Joi = require("joi");

const regexpName = /([A-Z])\w+((\s)?([A-Z]\w+))*/;
const regexpEmail = /^[a-zA-Z0-9_.±]+@([\w-]+.)+[\w-]{2,4}$/;
const regexpPhone = /^\+?\d{2,3}(-?\s? ?\d+)*$/;

const contactBaseSchema = Joi.object({
  name: Joi.string().regex(regexpName).min(3).max(30),
  email: Joi.string().email().regex(regexpEmail),
  phone: Joi.string().regex(regexpPhone),
  favorite: Joi.boolean().optional(),
});

const contactCreateSchema = contactBaseSchema.keys({
  name: Joi.required(),
  email: Joi.required(),
  phone: Joi.required(),
});

const contactUpdateSchema = contactBaseSchema.keys({
  name: Joi.optional(),
  email: Joi.optional(),
  phone: Joi.optional(),
});

const validateNewContact = (req, res, next) => {
  const { error } = contactCreateSchema.validate(req.body);
  console.log("error: ", error)
  if (error) {
    res.status(400).json({message: error.message})
  }
  next();
};

const validateUpContact = (req, res, next) => {
  const { error } = contactUpdateSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
  }
  next();
};

module.exports = { validateNewContact, validateUpContact };
