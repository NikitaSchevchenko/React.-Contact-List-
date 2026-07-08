import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./ContactForm.css";

export default function ContactForm({
  currentContactForEdit,
  onSubmit,
  onDelete,
}) {
  const [contactForEdit, setContactForEdit] = useState(currentContactForEdit);

  useEffect(() => {
    setContactForEdit(currentContactForEdit);
  }, [currentContactForEdit]);

  const onInputChange = (event) => {
    setContactForEdit((prevContact) => ({
      ...prevContact,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(contactForEdit);
  };

  const onClearField = (event) => {
    const fieldName = event.currentTarget.previousElementSibling?.name;

    if (fieldName) {
      setContactForEdit((prevContact) => ({
        ...prevContact,
        [fieldName]: "",
      }));
    }
  };

  return (
    <form className="contact-form" onSubmit={onFormSubmit}>
      <div className="form-elem">
        <input
          type="text"
          className="input-field"
          name="firstName"
          placeholder="First name"
          value={contactForEdit.firstName}
          onChange={onInputChange}
        />
        <span className="clear" onClick={onClearField}>
          ×
        </span>
      </div>

      <div className="form-elem">
        <input
          type="text"
          className="input-field"
          name="lastName"
          placeholder="Last name"
          value={contactForEdit.lastName}
          onChange={onInputChange}
        />
        <span className="clear" onClick={onClearField}>
          ×
        </span>
      </div>

      <div className="form-elem">
        <input
          type="email"
          className="input-field"
          name="email"
          placeholder="Email"
          value={contactForEdit.email}
          onChange={onInputChange}
        />
        <span className="clear" onClick={onClearField}>
          ×
        </span>
      </div>

      <div className="form-elem">
        <input
          type="tel"
          className="input-field"
          name="phone"
          placeholder="Phone"
          value={contactForEdit.phone}
          onChange={onInputChange}
        />
        <span className="clear" onClick={onClearField}>
          ×
        </span>
      </div>

      <div className="buttons">
        <button type="submit" className="primary-btn">
          Save
        </button>
        {contactForEdit.id ? (
          <button
            type="button"
            className="secondary-btn"
            onClick={() => onDelete(contactForEdit)}
          >
            Delete
          </button>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}

ContactForm.PropTypes = {
  currentContactForEdit: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
