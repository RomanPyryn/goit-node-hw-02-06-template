const { Contact } = require("../../models/modelContacts");

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const newContact = await Contact.create({
      name,
      email,
      phone,
    });
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addContact,
};
