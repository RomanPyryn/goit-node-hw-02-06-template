const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, loginValidation } = require("../../models/modelUsers");
const { SECRET_KEY } = process.env;

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const validation = loginValidation(req.body);
  if (validation.error) {
    return res
      .status(400)
      .json({ message: `Failed because ${validation.error}` });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  return res.status(200).json({
    token: token,
    user: {
      email: email,
    },
    message: "User logged in successfully",
  });
});

module.exports = router;
