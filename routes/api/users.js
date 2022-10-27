const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const gravatar = require("gravatar");
const {
  User,
  registerValidation,
  loginValidation,
  verifyEmailSchema,
} = require("../../models/modelUsers");
const {
  logout,
  getCurrent,
  changeAvatar,
  resendVerify,
} = require("../../controllers/auth/index");
const authentificate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");
const {
  ctrlWrapper,
  createVerifyEmail,
  sendEmail,
} = require("../../helpers/index");
const { verify } = require("../../controllers/auth/index");

const validateBody = require("../../middlewares/validateBody");
const { v4: uuidv4 } = require("uuid");

router.post("/register", async (req, res, next) => {
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
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = createVerifyEmail(email, verificationToken);

  await sendEmail(mail);

  return res.status(201).json({
    user: {
      email: result.email,
      verificationToken: result.verificationToken,
    },
    message: "User registered successfully",
  });
});

router.get("/verify/:verificationToken", ctrlWrapper(verify));

router.post(
  "/verify",
  validateBody(verifyEmailSchema),
  ctrlWrapper(resendVerify)
);

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  if (!user.verify) {
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

router.get("/logout", authentificate, ctrlWrapper(logout));

router.get("/current", authentificate, ctrlWrapper(getCurrent));

router.patch(
  "/avatars",
  authentificate,
  upload.single("avatar"),
  ctrlWrapper(changeAvatar)
);

module.exports = router;
