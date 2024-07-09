require('dotenv').config();
const LIMIT = 5;

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
    const filter = { owner: req.user._id };
    if (favorite) { filter.favorite = favorite };
    const contacts = await fetchAllContacts(page, limit, filter);

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const filter = { _id: contactId, owner: req.user._id };
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

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const contact = await createContact(req.body, req.user._id);
    if (!contact) {
      res.status(404).json({ message: "Contact not added" });
    } else {
      res.status(201).json(contact);
    }
  } catch (error) {
    next(error);
  }
};

const upContact = async (req, res, next) => {
  try {
    // const { contactId } = req.params;
    // const filter = { _id: contactId};
    // let contact = await fetchContact(filter);
    // if (!contact) {
    //   res.status(404).json({ message: "Contact not updated" });
    // } else {
    //   if (String(contact.owner) !== String(req.user._id)) {
    //     res.status(401).json({ message: "Unauthorized operation" });
    //   } else {
    //     contact = await updateContact(contactId, req.body);
    //     res.status(201).json(contact);
    //   }
    // }
    const contact = await updateContact(req.params.contactId, req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

const upStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    // const filter = { _id: contactId };
    // let contact = await fetchContact(filter);
    // if (!contact) {
    //   res.status(404).json({ message: "Contact not found" });
    // } else {
    //   if (String(contact.owner) !== String(req.user._id)) {
    //     res.status(401).json({ message: "Unauthorized operation" });
    //   } else {
    //     contact = await updateContact(contactId, req.body);
    //     res.status(200).json(contact);
    //   }
    // }
    const contact = await updateContact(contactId, req.body);
    res.status(200).json(contact);
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
