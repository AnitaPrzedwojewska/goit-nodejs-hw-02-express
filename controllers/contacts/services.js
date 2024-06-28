const Contact = require('../../models/contacts');

const fetchAllContacts = () => {
  return Contact.find();
}

// const fetchContact = (id) => {
//   return Contact.findOne({
//     _id: id
//   })
// }

module.exports = {
  fetchAllContacts,
  // fetchContact
}