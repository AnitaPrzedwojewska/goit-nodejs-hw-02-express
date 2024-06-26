const express = require("express");
const { v4: uuidv4 } = require("uuid");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const validateContact = require("../../utils/validator");

const router = express.Router();

// GET contacts list =================================
router.get("/", async (_, res) => {
  try {
    const contacts = await listContacts();
    res
      .status(200)
      .json({ status: "200", message: "Success", data: { contacts } })
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ status: "404", message: "Not found", details: error.message });
  }
});

// GET contact by id =================================
router.get("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (contact) {
      res
        .status(200)
        .json({ status: "200", message: "Success", data: { contact } });
    } else {
      res
        .status(404)
        .json({ status: "404", message: "Contact not found" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ status: "404", message: "Not found", details: error.message});
  }
});

// DELETE contact by id =================================
router.delete("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (contact) {
      await removeContact(contactId);
      res
        .status(201)
        .json({ status: "201", message: "Contact deleted" });
    } else {
      res
        .status(404)
        .json({ status: "404", message: "Contact not found" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ status: "404", message: "Not found", details: error.message });
  }
});

// ADD contact =================================
router.post("/", async (req, res) => {
  try {
    const result = validateContact(req.body);
    if (result.error) {
      return res
        .status(400)
        .json({ status: "400", message: result.error.message });
    } else {
      const validatedContact = result.value;
      validatedContact.id = uuidv4();
      await addContact(validatedContact);
      res
        .status(201)
        .json({ status: "201", message: "Contact added", data: validatedContact });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ status: "404", message: "Not found", details: error.message });
  }
});

// UPDATE contact =================================
router.put("/:contactId", async (req, res) => {
  try {
    const result = validateContact(req.body);
    if (result.error) {
      return res
        .status(400)
        .json({ status: "400", message: result.error.message });
    } else {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);
      if (contact) {
        await updateContact(contactId, result.value);
        res
          .status(200)
          .json({ status: "200", message: "Contact updated", data: contact });
      } else {
        res
          .status(404)
          .json({ status: "404", message: "Contact not found" });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ status: "404", message: "Not found", details: error.message });
  }
});

module.exports = router;
