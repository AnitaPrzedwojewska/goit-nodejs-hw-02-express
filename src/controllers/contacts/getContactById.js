const { fetchContact } = require('../../services/contacts-services');

const getContactById = async (req, res, next) => {
  try {
    const filter = { _id: req.params.contactId, owner: req.user._id };
    const contact = await fetchContact(filter);
    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
    } else {
      if (String(contact.owner) !== String(req.user._id)) {
        res.status(401).json({ message: "Unauthorized operation" });
      } else {
        res.status(200).json(contact);
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;