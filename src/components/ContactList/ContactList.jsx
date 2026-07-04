import { Component } from "react";
import ContactItem from "../ContactItem/ContactItem";
import "./ContactList.css";

export class ContactList extends Component {
  render() {
    const { contacts, onSelect, onDelete } = this.props;

    return (
      <div className="contact-list">
        {contacts.length ? (
          contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              onSelect={onSelect}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="empty-state">No contacts yet. Add the first one.</div>
        )}
      </div>
    );
  }
}

export default ContactList;
