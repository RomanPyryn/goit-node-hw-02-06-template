const express = require("express");
const router = express.Router();
const authenticate = require("../../middlewares/authenticate");
const { ctrlWrapper } = require("../../helpers/index");
const { getCurrent } = require("../../controllers/auth/index");

router.get("/", authenticate, ctrlWrapper(getCurrent));

module.exports = router;
