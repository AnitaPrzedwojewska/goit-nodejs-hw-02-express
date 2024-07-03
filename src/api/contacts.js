const express = require("express");
const router = express.Router();

const {
  getAllContacts,
  getContactById,
  deleteContact,
  addContact,
  upContact,
  upStatusContact
} = require("../controllers/contacts/index");

// const { validateNewContact, validateUpContact } = require('../middlewares/contacts/validators');

// GET contacts list =================================
router.get("/contacts/", getAllContacts);

// GET contact by id =================================
router.get("/contacts/:contactId", getContactById);

// DELETE contact by id =================================
router.delete("/contacts/:contactId", deleteContact);

// ADD contact =================================
router.post("/contacts/", addContact);
// router.post("/contacts/", validateNewContact, addContact);

// UPDATE contact =================================
router.patch("/contacts/:contactId", upContact);
// router.patch("/contacts/:contactId", validateUpContact, upContact);

// UPDATE contact status =================================
router.patch("/contacts/:contactId/favorite", upStatusContact);

module.exports = router;
