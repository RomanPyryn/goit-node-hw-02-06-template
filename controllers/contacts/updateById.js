const { Contact } = require("../../models/modelContacts");

const updateContact = async (userFromReq, contactId, body) => {
  try {
    const { name, email, phone } = body;
    const updatedContact = {};

    if (updatedContact.name !== name) {
      if (name) {
        updatedContact.name = name;
      }
    }

    if (updatedContact.email !== email) {
      if (email) {
        updatedContact.email = email;
      }
    }

    if (updatedContact.phone !== phone) {
      if (phone) {
        updatedContact.phone = phone;
      }
    }

    const { _id: owner } = userFromReq;

    const contact = await Contact.findOneAndUpdate(
      { _id: contactId, owner },
      updatedContact,
      { new: true }
    );
    return contact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateContact,
};
