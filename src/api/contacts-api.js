const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authorization/user-auth");

const {
  getAllContacts,
  getContactById,
  deleteContact,
  addContact,
  upContact,
  upStatusContact,
} = require("../controllers/contacts-controller");

const {
  validateContact,
  validateContactStatus,
} = require("../middlewares/validators/contacts-validators");

// GET contacts list =================================
router.get("/contacts/", auth, getAllContacts);

// GET contact by id =================================
router.get("/contacts/:contactId", auth, getContactById);

// DELETE contact by id =================================
router.delete("/contacts/:contactId", auth, deleteContact);

// ADD contact =================================
router.post("/contacts/", auth, validateContact, addContact);

// UPDATE contact =================================
router.put("/contacts/:contactId", auth, validateContact, upContact);

// UPDATE contact status =================================
router.patch(
  "/contacts/:contactId/favorite",
  auth,
  validateContactStatus,
  upStatusContact
);

module.exports = router;
