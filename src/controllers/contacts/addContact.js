const { createContact } = require('../../services/contacts-services');

const addContact = async (req, res, next) => {
  try {
    const contact = await createContact(req.body, req.user._id);
    if (!contact) {
      res.status(404).json({ message: "Contact not added" });
    } else {
      res.status(201).json(contact);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;