const express = require("express");
const Joi = require('joi');

const contacts = require("../../models/contacts");

const router = express.Router();

router.get('/', async (req, res, next) => {
  const result = await contacts.listContacts();
  return res.status(200).json({ result, message: 'Success' });
})

router.get('/:contactId', async (req, res, next) => {  
  const contact = await contacts.getContactById(req.params.contactId);

  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }

  return res.status(200).json({ contact, message: 'Success' });
})

router.post('/', async (req, res, next) => {

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

  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^\w+\s/)
      .min(3)
      .max(30)
      .required(),
    email:Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
      .required(),
    phone: Joi.string()
      .pattern(/^(?:\+38)?(?:\(\d{3}\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})/)
      .required(),
  });

  const validation = schema.validate(req.body); 
  if (validation.error) {
    return res.status(400).json({ message: `Failed because ${validation.error}` });
  }

  const contact = await contacts.addContact(req.body);
  return res.status(201).json({ contact, message: 'Success' });
})

router.delete('/:contactId', async (req, res, next) => {
  
  const contact = await contacts.removeContact(req.params.contactId);

  if(contact) {
    return res.status(200).json({ message: 'Contact deleted' });
  } 

  return res.status(404).json({ message: 'Not found' });
})

router.put('/:contactId', async (req, res, next) => {

  const keysOfBody = Object.keys(req.body);

  if (keysOfBody.length === 0) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^\w+\s/)
      .min(3)
      .max(30)
      .optional(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
      .optional(),
    phone: Joi.string()
      .pattern(/^(?:\+38)?(?:\(\d{3}\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})/)
      .optional(),
  });

  const validation = schema.validate(req.body);
  
  if (validation.error) {
    return res.status(400).json({ message: `Failed because ${validation.error}` });
  }

  const contact = await contacts.updateContact(req.params.contactId, req.body);

  // const contact = result.filter(contact => contact.id === req.params.contactId);

  if (contact) {
    return res.status(200).json({ contact, message: 'Success' });
  }
  
  return res.status(404).json({ message: 'Not found' });  
})

module.exports = router;
