const { updateStatus } = require("./updateStatus");
const { addContact } = require("./add");
const { listContacts } = require("./getAll");
const { getContactById } = require("./getById");
const { removeContact } = require("./removeById");
const { updateContact } = require("./updateById");

module.exports = {
  updateStatus,
  addContact,
  listContacts,
  getContactById,
  removeContact,
  updateContact,
};
