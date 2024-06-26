const fs = require('node:fs/promises');
const path = require("node:path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    return contacts;
  } catch (error) {
    throw new Error(error);
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    const results = contacts.find((contact) => contact.id === contactId);
    return results;
  } catch (error) {
    throw new Error(error);
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    const results = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(results));
  } catch (error) {
    throw new Error(error);
  }
}

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    contacts.push(body);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    throw new Error(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    const contact = contacts.find((contact) => contact.id === contactId);
    Object.keys(body).forEach((key) => (contact[key] = body[key]));
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
