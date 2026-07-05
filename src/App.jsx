import { Component } from "react";
import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";
import { nanoid } from "nanoid";
import "./App.css";

export class App extends Component {
  state = {
    contacts: [],
    contactForEdit: this.createEmptyContact(),
    formResetKey: 0,
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem("contacts"));

    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  saveToStorage(contacts) {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  createEmptyContact() {
    return {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
  }

  addContact = () => {
    this.setState((state) => ({
      contactForEdit: this.createEmptyContact(),
      formResetKey: state.formResetKey + 1,
    }));
  };

  createContact = (contact) => {
    this.setState((state) => {
      const newContact = { ...contact, id: nanoid() };
      const contacts = [...state.contacts, newContact];
      this.saveToStorage(contacts);

      return {
        contacts,
        contactForEdit: this.createEmptyContact(),
      };
    });
  };

  editContact = (contact) => {
    this.setState((state) => {
      const contacts = state.contacts.map((item) =>
        item.id === contact.id ? contact : item,
      );
      this.saveToStorage(contacts);

      return {
        contacts,
        contactForEdit: contact,
      };
    });
  };

  saveContact = (contact) => {
    if (!contact.id) {
      this.createContact(contact);
    } else {
      this.editContact(contact);
    }
  };

  deleteContact = (contact) => {
    this.setState((state) => {
      const contacts = state.contacts.filter((item) => item.id !== contact.id);
      this.saveToStorage(contacts);

      return {
        contacts,
        contactForEdit: this.createEmptyContact(),
      };
    });
  };

  selectContact = (contact) => {
    this.setState({ contactForEdit: contact });
  };

  render() {
    const { contacts, contactForEdit } = this.state;

    return (
      <div className="app-shell">
        <header className="app-header">
          <h1>Contact List</h1>
          <p>Manage contacts in a modern two-panel workspace.</p>
        </header>

        <div className="app-content">
          <section className="panel contacts-panel">
            <div className="panel-header">
              <h2>Contacts</h2>
              <span>{contacts.length} total</span>
            </div>

            <ContactList
              contacts={contacts}
              onSelect={this.selectContact}
              onDelete={this.deleteContact}
            />

            <button type="button" className="panel-action-btn" onClick={this.addContact}>
              New
            </button>
          </section>

          <section className="panel form-panel">
            <div className="panel-header">
              <h2>{contactForEdit.id ? "Edit contact" : "Add contact"}</h2>
              <span>{contactForEdit.id ? "Editing" : "Creating"}</span>
            </div>

            <ContactForm
              contactForEdit={contactForEdit}
              resetKey={this.state.formResetKey}
              onSubmit={this.saveContact}
              onDelete={this.deleteContact}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default App;
