const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User, registerValidation } = require("../../models/modelUsers");

router.post("/", async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }

  const validation = registerValidation(req.body);
  if (validation.error) {
    return res
      .status(400)
      .json({ message: `Failed because ${validation.error}` });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ name, email, password: hashPassword });
  return res.status(201).json({
    user: {
      email: result.email,
      // "subscription": "starter"
    },
    message: "User registered successfully",
  });
});

module.exports = router;
