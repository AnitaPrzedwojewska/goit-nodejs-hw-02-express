const { removeContact } = require('../../services/contacts-services');

const deleteContact = async (req, res, next) => {
  try {
    const filter = { _id: req.params.contactId, owner: req.user._id };
    const contact = await removeContact(filter);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;