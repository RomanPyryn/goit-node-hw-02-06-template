const { Contact } = require("../../models/modelContacts");

const listContacts = async () => {
  try {
    const contacts = await Contact.find({});
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
};
