const Contact = require("../../models/contacts");

const fetchAllContacts = () => {
  return Contact.find();
};

const fetchContact = (contactId) => {
  return Contact.findOne({ _id: contactId });
};

const removeContact = (contactId) => {
  return Contact.deleteOne({ _id: contactId });
};

const createContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const updateContact = (contactId, toUpdate, upsert = false) => {
  return Contact.findOneAndUpdate(
    { _id: contactId },
    { $set: toUpdate },
    {
      new: true,
      validateBeforeSave: true,
      runValidators: true,
      context: "query",
      upsert,
    }
  );
};

module.exports = {
  fetchAllContacts,
  fetchContact,
  removeContact,
  createContact,
  updateContact,
};
