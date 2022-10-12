const mongoose = require("mongoose");
const Joi = require("joi");

const contactsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    // required: true,
  },
});

const Contact = mongoose.model("Contact", contactsSchema);

const nameRegEx = /^\w+\s/;
const phoneRegEx =
  /^(?:\+38)?(?:\(\d{3}\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})/;
const emailValidation = {
  minDomainSegments: 2,
  tlds: { allow: ["com", "net", "org"] },
};

function addContactValidation(body) {
  const schema = Joi.object({
    name: Joi.string().pattern(nameRegEx).min(3).max(30).required(),
    email: Joi.string().email(emailValidation).required(),
    phone: Joi.string().pattern(phoneRegEx).required(),
  });

  return schema.validate(body);
}

function updateContactValidation(body) {
  const schema = Joi.object({
    name: Joi.string().pattern(nameRegEx).min(3).max(30).optional(),
    email: Joi.string().email(emailValidation).optional(),
    phone: Joi.string().pattern(phoneRegEx).optional(),
  });

  return schema.validate(body);
}

function updateStatusValidation(body) {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  return schema.validate(body);
}

module.exports = {
  Contact,
  addContactValidation,
  updateContactValidation,
  updateStatusValidation,
};
