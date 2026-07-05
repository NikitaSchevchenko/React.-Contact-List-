import { Component } from "react";
import "./ContactItem.css";

export class ContactItem extends Component {
  render() {
    const { firstName, lastName } = this.props.contact;

    return (
      <div
        className="contact-item"
        onDoubleClick={() => this.props.onSelect(this.props.contact)}
      >
        <div className="contact-item__content">
          <span className="contact-item__name">
            {firstName} {lastName}
          </span>
          <span className="contact-item__hint">Double-click to edit</span>
        </div>

        <button
          type="button"
          className="contact-item__delete"
          onClick={() => this.props.onDelete(this.props.contact)}
          aria-label={`Delete ${firstName} ${lastName}`}
        >
          ×
        </button>
      </div>
    );
  }
}

export default ContactItem;
