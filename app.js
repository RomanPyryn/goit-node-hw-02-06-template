const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const registerRouter = require("./routes/api/register");
const loginRouter = require("./routes/api/login");
const logoutRouter = require("./routes/api/logout");
const currentRouter = require("./routes/api/current");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users/register", registerRouter);
app.use("/api/users/login", loginRouter);
app.use("/api/users/logout", logoutRouter);
app.use("/api/users/current", currentRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
