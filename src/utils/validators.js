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

const validateNewContact = (contact) => {
  return contactCreateSchema.validate(contact);
};

const validateUpContact = (contact) => {
  return contactUpdateSchema.validate(contact);
};

module.exports = {validateNewContact, validateUpContact};
