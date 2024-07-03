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

const {
  validateContact,
  validateContactStatus,
} = require("../middlewares/contacts/validators");

// GET contacts list =================================
router.get("/contacts/", getAllContacts);

// GET contact by id =================================
router.get("/contacts/:contactId", getContactById);

// DELETE contact by id =================================
router.delete("/contacts/:contactId", deleteContact);

// ADD contact =================================
router.post("/contacts/", validateContact, addContact);

// UPDATE contact =================================
router.put("/contacts/:contactId", validateContact, upContact);

// UPDATE contact status =================================
router.patch(
  "/contacts/:contactId/favorite",
  validateContactStatus,
  upStatusContact
);

module.exports = router;
