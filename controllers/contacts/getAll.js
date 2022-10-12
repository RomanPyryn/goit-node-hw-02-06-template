const { Contact } = require("../../models/modelContacts");

const listContacts = async (req) => {
  try {
    const { _id: ownerId } = req.user;
    const contacts = await Contact.find({ ownerId });
    return contacts;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
};
