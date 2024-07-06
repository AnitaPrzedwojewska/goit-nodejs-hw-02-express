require('dotenv').config();
const LIMIT = process.env.LIMIT;

const {
  fetchAllContacts,
  fetchContact,
  removeContact,
  createContact,
  updateContact,
} = require("../services/contacts-services");

const getAllContacts = async (req, res, next) => {
  try {
    const { page = 1, limit = LIMIT, favorite } = req.query;
    console.log('page: ', page, '; limit: ', limit, '; favorite: ', favorite);
    const filter = favorite ? {favorite: favorite} : {};
    const contacts = await fetchAllContacts(page, limit, filter);

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await fetchContact(contactId);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (contact) {
      res.status(201).json({ message: "Contact deleted" });
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const result = await createContact(req.body);
    if (!result) {
      res.status(404).json({ message: "Contact not added" });
    } else {
      res.status(201).json(result);
    }
  } catch (error) {
    next(error);
  }
};

const upContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    console.log('result: ', result);
    if (!result) {
      res.status(404).json({ message: "Contact not updated" });
    } else {
      res.status(201).json(result);
    }
  } catch (error) {
    next(error);
  }
};

const upStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      res.status(404).json({ message: "Contact not updated" });
    } else {
      res.status(201).json(result);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  deleteContact,
  addContact,
  upContact,
  upStatusContact,
};
