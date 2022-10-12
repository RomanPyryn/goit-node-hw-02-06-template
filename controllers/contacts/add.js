const { Contact } = require("../../models/modelContacts");

const addContact = async (body, user) => {
  try {
    console.log(user);
    const { _id: owner } = user;
    const { name, email, phone } = body;
    const newContact = await Contact.create({
      name,
      email,
      phone,
      owner,
    });
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addContact,
};
