import { Component } from "react";
import "./ContactItem.css";

export class ContactItem extends Component {
  handleDelete = (event) => {
    event.stopPropagation();
    this.props.onDelete(this.props.contact);
  };

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
          onClick={this.handleDelete}
          aria-label={`Delete ${firstName} ${lastName}`}
        >
          ×
        </button>
      </div>
    );
  }
}

export default ContactItem;
