const express = require("express");
const {
  addContactValidation,
  updateContactValidation,
  updateStatusValidation,
} = require("../../models/modelContacts");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatus,
} = require("../../controllers/contacts/index");
const router = express.Router();
const authentificate = require("../../middlewares/authenticate");

router.get("/", authentificate, async (req, res, next) => {
  const contacts = await listContacts(req);
  return res.status(200).json({ contacts, message: "Success" });
});

router.get("/:contactId", authentificate, async (req, res, next) => {
  const contact = await getContactById(req.user, req.params.contactId);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.status(200).json({ contact, message: "Success" });
});

router.post("/", authentificate, async (req, res, next) => {
  const { user } = req;

  const { name, email, phone } = req.body;

  if (!name) {
    return res.status(400).json({ message: `Missing required name field` });
  }

  if (!email) {
    return res.status(400).json({ message: `Missing required email field` });
  }

  if (!phone) {
    return res.status(400).json({ message: `Missing required phone field` });
  }

  const validation = addContactValidation(req.body);
  if (validation.error) {
    return res
      .status(400)
      .json({ message: `Failed because ${validation.error}` });
  }

  const newContact = await addContact(req.body, user);
  return res.status(201).json({ newContact, message: "Success" });
});

router.delete("/:contactId", authentificate, async (req, res, next) => {
  const contact = await removeContact(req.user, req.params.contactId);

  if (contact) {
    return res.status(200).json({ message: "Contact deleted" });
  }

  return res.status(404).json({ message: "Not found" });
});

router.put("/:contactId", authentificate, async (req, res, next) => {
  const keysOfBody = Object.keys(req.body);

  if (keysOfBody.length === 0) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const validation = updateContactValidation(req.body);

  if (validation.error) {
    return res
      .status(400)
      .json({ message: `Failed because ${validation.error}` });
  }

  const contact = await updateContact(req.user, req.params.contactId, req.body);

  if (contact) {
    return res.status(200).json({ contact, message: "Success" });
  }

  return res.status(404).json({ message: "Not found" });
});

router.patch("/:contactId/favorite", authentificate, async (req, res, next) => {
  const validation = updateStatusValidation(req.body);

  if (validation.error) {
    return res
      .status(400)
      .json({ message: `Failed because ${validation.error}` });
  }

  const contact = await updateStatus(req.user, req.params.contactId, req.body);

  if (contact) {
    return res.status(200).json({ contact, message: "Success" });
  }

  return res.status(404).json({ message: "Not found" });
});

module.exports = router;
