const express = require("express");
const router = express.Router();
// const Contact = require('../models/contacts');

const {
  getAllContacts,
  // getContactById,
  // addContact,
  // removeContact,
  // updateContact,
} = require("../controllers/contacts/index");


// GET contacts list =================================
router.get("/", getAllContacts);
// router.get("/", async (req, res) => {
//   const contacts = await Contact.find();
//   res.json(contacts);
// })

// GET contact by id =================================
// router.get("/:contactId", getContactById);

// DELETE contact by id =================================
// router.delete("/:contactId", removeContact);

// ADD contact =================================
// router.post("/", addContact);

// UPDATE contact =================================
// router.put("/:contactId", updateContact);

module.exports = router;
