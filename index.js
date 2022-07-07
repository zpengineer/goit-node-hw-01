const { Command } = require("commander");
const contactsOperations = require("./db/contacts");

const program = new Command();

program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const contacts = await contactsOperations.listContacts();
            console.table(contacts);
            break;
        case "get":
            const contact = await contactsOperations.getContactById(id);
            if(!contact) {
                throw new Error(`Contact with id: ${id} not found`);
            }
            console.log(contact);
            break;
        case "remove":
            const removeContact = await contactsOperations.removeContact(id);
            if(!removeContact) {
                throw new Error(`Contact with id: ${id} not found`);
            }
            console.log(removeContact);
            break;
        case "add":
            const addContact = await contactsOperations.addContact(name, email, phone);
            console.log(addContact);
            break;
        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);