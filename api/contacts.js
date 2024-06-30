const express = require("express");
const router = express.Router();
// const Contact = require('../models/contacts');

const {
  getAllContacts,
  getContactById,
  deleteContact,
  addContact,
  upContact,
  upStatusContact
} = require("../controllers/contacts/index");


// GET contacts list =================================
router.get("/", getAllContacts);

// GET contact by id =================================
router.get("/:contactId", getContactById);

// DELETE contact by id =================================
router.delete("/:contactId", deleteContact);

// ADD contact =================================
router.post("/", addContact);

// UPDATE contact =================================
router.patch("/:contactId", upContact);

// UPDATE contact status =================================
router.patch("/:contactId/favorite", upStatusContact);

module.exports = router;
