const Joi = require("joi");

const schemaContact = Joi.object({
  name: Joi.string()
    .regex(/([A-Z])\w+((\s)?([A-Z]\w+))*/)
    .min(3)
    .max(30)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^\+?\d{2,3}(-?\s? ?\d+)*$/)
    .required()
});

const validateContact = (contact) => {
  return schemaContact.validate(contact);
};

module.exports = validateContact;
