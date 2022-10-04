const { Contact } = require("../../models/modelContacts");

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findOne({ _id: contactId });
    return contact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getContactById,
};
