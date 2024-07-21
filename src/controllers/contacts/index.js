const getAllContacts = require('./gettAllContacts');
const getContactById = require("./getContactById");
const deleteContact = require("./deleteContact");
const addContact = require("./addContact");
const upContact = require("./upContact");
const upStatusContact = require("./upStatusContact");

module.exports = {
  getAllContacts,
  getContactById,
  deleteContact,
  addContact,
  upContact,
  upStatusContact,
};
