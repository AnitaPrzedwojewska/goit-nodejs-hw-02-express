const {
  fetchAllContacts,
  fetchContact,
  removeContact,
  createContact,
  updateContact,
} = require("../../services/contacts/index");

const { validateNewContact, validateUpContact } = require("../../utils/validators");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await fetchAllContacts();
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
    const result = validateNewContact(req.body);
    if (result.error) {
      res
        .status(400)
        .json({ message: result.error.message })
    }

    else {
      const { name, email, phone } = req.body;
      const result = await createContact({ name, email, phone });
      if (!result) {
        res.status(404).json({ message: "Contact not added" });
      } else {
        res.status(201).json(result);
      }
    }
  } catch (error) {
    next(error);
  }
};

// const addContact = async (req, res, next) => {
//   try {
//     const { name, email, phone } = req.body;
//     const result = await createContact({ name, email, phone });
//     if (!result) {
//       res.status(404).json({ message: "Contact not added" });
//     } else {
//       res.status(201).json(result);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

const upContact = async (req, res, next) => {
  try {
    if (req.body === {}) {
      res
        .status(400)
        .json({ message: "Missing fields to update" });

    } else {
      const result = validateUpContact(req.body);
      if (result.error) {
        res.status(400).json({ message: result.error.message });

      } else {
        const bodyKeys = Object.keys(req.body);
        const allowedFields = ["name", "email", "phone"];
        const invalidFields = bodyKeys.filter((key) => !allowedFields.includes(key))
        if (invalidFields.length > 0) {
          const errors = invalidFields.map((field) => `Invalid field name - ${field}`)
          res
            .status(400)
            .json({ message: "Not allowed field(s) name", errors });
          next(errors)
        } else {
          const { contactId } = req.params;
          const result = await updateContact(contactId, req.body);
          if (!result) {
            res.status(404).json({ message: "Contact not updated" });
          } else {
            res.status(201).json(result);
          }
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

// const upContact = async (req, res, next) => {
//   try {
//     if (req.body === {}) {
//       res.status(400).json({ message: "Missing fields to update" });
//     } else {
//       const bodyKeys = Object.keys(req.body);
//       const allowedFields = ["name", "email", "phone"];
//       const invalidFields = bodyKeys.filter(
//         (key) => !allowedFields.includes(key)
//       );
//       if (invalidFields.length > 0) {
//         const errors = invalidFields.map(
//           (field) => `Invalid field name - ${field}`
//         );
//         res
//           .status(400)
//           .json({ message: "Not allowed field(s) name", errors });
//         next(errors);
//       } else {
//         const { contactId } = req.params;
//         const result = await updateContact(contactId, req.body);
//         if (!result) {
//           res.status(404).json({ message: "Contact not updated" });
//         } else {
//           res.status(201).json(result);
//         }
//       }
//     }
//   } catch (error) {
//     next(error);
//   }
// };

const upStatusContact = async (req, res, next) => {
  try {
    if (req.body === {}) {
      res.status(400).json({ message: "Missing field favorite" });

    } else {
      const bodyKeys = Object.keys(req.body);
      const allowedFields = ["favorite"];
      const invalidFields = bodyKeys.filter(
        (key) => !allowedFields.includes(key)
      );
      if (invalidFields.length > 0) {
        const errors = invalidFields.map(
          (field) => `Invalid field name - ${field}`
        );
        res
          .status(400)
          .json({ message: "Not allowed field(s) name", errors });
        next(errors);
      } else {
        const { contactId } = req.params;
        const result = await updateContact(contactId, req.body);
        if (!result) {
          res.status(404).json({ message: "Contact not updated" });
        } else {
          res.status(201).json(result);
        }
      }
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
