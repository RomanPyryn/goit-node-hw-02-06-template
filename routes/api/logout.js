const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers/index");
const { logout } = require("../../controllers/auth/index");
const authenticate = require("../../middlewares/authenticate");

router.get("/", authenticate, ctrlWrapper(logout));

module.exports = router;
