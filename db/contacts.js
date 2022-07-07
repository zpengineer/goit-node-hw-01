const fs = require("fs/promises");
const path = require("path");
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data);
    return parseData;
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();

    const result = contacts.find(contact => contact.id === contactId);

    if(!result) {
        return null;
    }
    return result;
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();

    const findIndex = contacts.findIndex(contact => contact.id === contactId);
    
    if (findIndex === -1) {
        return null;
    }
    const removeContact = contacts.splice(findIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return removeContact;
}

const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    
    const newContact = { id: v4(), name, email, phone };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};