const Contact = require("../models/contacts-schema");

const fetchAllContacts = (page, limit, filter) => {
  return Contact.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);
};

const fetchContact = (filter) => {
  return Contact.findOne(filter);
};

const removeContact = (contactId) => {
  return Contact.deleteOne({ _id: contactId });
};

const createContact = ({ name, email, phone }, owner) => {
  return Contact.create({ name, email, phone, owner });
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
