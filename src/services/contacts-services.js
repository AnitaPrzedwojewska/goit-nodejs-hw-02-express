const Contact = require("../models/contacts-schema");

const fetchAllContacts = (page, limit, filter) => {
  return Contact.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);
};

const fetchContact = (filter) => {
  return Contact.findOne(filter);
};

const createContact = ({ name, email, phone }, owner) => {
  return Contact.create({ name, email, phone, owner });
};

const removeContact = (filter) => {
  return Contact.deleteOne(filter);
};

const updateContact = (filter, toUpdate, upsert = false) => {
  return Contact.findOneAndUpdate(
    filter,
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
