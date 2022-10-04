const { Contact } = require("../../models/modelContacts");

const updateStatus = async (contactId, body) => {
  try {
    const { favorite } = body;

    if (favorite !== undefined) {
      const contact = await Contact.findOneAndUpdate(
        { _id: contactId },
        { favorite },
        { new: true }
      );
      return contact;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateStatus,
};
