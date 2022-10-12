const { Contact } = require("../../models/modelContacts");

const updateStatus = async (userFromReq, contactId, body) => {
  try {
    const { favorite } = body;
    const { _id: owner } = userFromReq;

    if (favorite !== undefined) {
      const contact = await Contact.findOneAndUpdate(
        { _id: contactId, owner },
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
