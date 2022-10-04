const { Contact } = require("../../models/modelContacts");

const removeContact = async (contactId) => {
  try {
    const contact = await Contact.findOneAndRemove({ _id: contactId });
    return contact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  removeContact,
};
