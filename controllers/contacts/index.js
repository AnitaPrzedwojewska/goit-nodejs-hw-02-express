const {
  fetchAllContacts,
  // fetchContact
} = require("./services");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await fetchAllContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

// const getContactById = async (req,res, next) => {
//   try {
//     const contact = await fetchContact(req.params.id);
//     if (contact) {
//       res.json(contact)
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// const removeContact = async (contactId) => {
//   try {
//     const data = await fs.readFile(contactsPath);
//     const contacts = JSON.parse(data.toString());
//     const results = contacts.filter((contact) => contact.id !== contactId);
//     await fs.writeFile(contactsPath, JSON.stringify(results));
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const addContact = async (body) => {
//   try {
//     const data = await fs.readFile(contactsPath);
//     const contacts = JSON.parse(data.toString());
//     contacts.push(body);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts));
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// const updateContact = async (contactId, body) => {
//   try {
//     const data = await fs.readFile(contactsPath);
//     const contacts = JSON.parse(data.toString());
//     const contact = contacts.find((contact) => contact.id === contactId);
//     Object.keys(body).forEach((key) => (contact[key] = body[key]));
//     await fs.writeFile(contactsPath, JSON.stringify(contacts));
//   } catch (error) {
//     throw new Error(error);
//   }
// };

module.exports = {
  getAllContacts,
  // getContactById,
  // removeContact,
  // addContact,
  // updateContact,
};
