import { Component } from "react";
import PropTypes from "prop-types";
import ContactItem from "../ContactItem/ContactItem";
import "./ContactList.css";

export default function ContactList({ contacts, onSelect, onDelete }) {
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

ContactList.PropTypes = {
  contacts: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
