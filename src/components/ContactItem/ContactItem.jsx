import { Component } from "react";
import PropTypes from "prop-types";
import "./ContactItem.css";

export default function ContactItem({ contact, onSelect, onDelete }) {
  const { firstName, lastName } = contact;

  return (
    <div className="contact-item" onDoubleClick={() => onSelect(contact)}>
      <div className="contact-item__content">
        <span className="contact-item__name">
          {firstName} {lastName}
        </span>
        <span className="contact-item__hint">Double-click to edit</span>
      </div>

      <button
        type="button"
        className="contact-item__delete"
        onClick={() => onDelete(contact)}
        aria-label={`Delete ${firstName} ${lastName}`}
      >
        ×
      </button>
    </div>
  );
}

ContactItem.PropTypes = {
  contact:PropTypes.object.isRequired, 
  onSelect:PropTypes.func.isRequired, 
  onDelete:PropTypes.func.isRequired
};
