import { useState, useEffect } from "react";
import ContactList from "./components/ContactList/ContactList";
import ContactForm from "./components/ContactForm/ContactForm";
import "./App.css";
import api from "./api/contactsservice";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [contactForEdit, setContactForEdit] = useState(createEmptyContact());

  useEffect(() => {
    api.get("/").then(({ data }) => {
      if (!data) {
        setContacts([]);
      } else {
        setContacts(data);
      }
    });
  }, []);


  function createEmptyContact() {
    return {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
  }

  const addContact = () => {
    setContactForEdit(createEmptyContact());
  };

  const createContact = (contact) => {
    api.post("/", contact).then(({ data }) => {
      const contactsNew = [...contacts, data];
      setContacts(contactsNew);
      setContactForEdit(createEmptyContact());
    });
  };

  const editContact = (contact) => {
    api.put(`/${contact.id}`, contact).then(({ data }) => {
      const contacts = contacts.map((item) =>
        item.id === contact.id ? data : item,
      );
      setContacts(contacts);
      setContactForEdit(contact);
    });
  };

  const saveContact = (contact) => {
    if (!contact.id) {
      createContact(contact);
    } else {
      editContact(contact);
    }
  };

  const deleteContact = (contact) => {
    api.delete(`/${contact.id}`);
    const contactsNew = contacts.filter((item) => item.id !== contact.id);
    setContacts(contactsNew);
    setContactForEdit(createEmptyContact());
  };

  const selectContact = (contact) => {
    setContactForEdit(contact);
  };

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
            onSelect={selectContact}
            onDelete={deleteContact}
          />

          <button
            type="button"
            className="panel-action-btn"
            onClick={addContact}
          >
            New
          </button>
        </section>

        <section className="panel form-panel">
          <div className="panel-header">
            <h2>{contactForEdit.id ? "Edit contact" : "Add contact"}</h2>
            <span>{contactForEdit.id ? "Editing" : "Creating"}</span>
          </div>

          <ContactForm
            currentContactForEdit={contactForEdit}
            onSubmit={saveContact}
            onDelete={deleteContact}
          />
        </section>
      </div>
    </div>
  );
}
