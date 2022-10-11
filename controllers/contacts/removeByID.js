const { Contact } = require("../../models/modelContacts");

const removeContact = async (userFromReq, contactId) => {
  try {
    const { _id: owner } = userFromReq;
    const contact = await Contact.findOneAndRemove({ _id: contactId, owner });
    return contact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  removeContact,
};
