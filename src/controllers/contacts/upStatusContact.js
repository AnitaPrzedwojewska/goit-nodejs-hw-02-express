const { updateContact } = require('../../services/contacts-services');

const upStatusContact = async (req, res, next) => {
  try {
    const filter = { _id: req.params.contactId, owner: req.user._id };
    const contact = await updateContact(filter, req.body);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = upStatusContact;