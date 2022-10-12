const mongoose = require("mongoose");
const Joi = require("joi");

const usersSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
});

const User = mongoose.model("User", usersSchema);

function registerValidation(body) {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(body);
}

function loginValidation(body) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(body);
}

module.exports = {
  User,
  registerValidation,
  loginValidation,
};
