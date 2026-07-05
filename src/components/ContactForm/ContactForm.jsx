import { Component } from "react";
import "./ContactForm.css";

export class ContactForm extends Component {
  state = {
    ...this.props.contactForEdit,
    prevContactForEdit: this.props.contactForEdit,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.contactForEdit !== prevState.prevContactForEdit) {
      return {
        ...nextProps.contactForEdit,
        prevContactForEdit: nextProps.contactForEdit,
      };
    }

    return null;
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  onClearField = (event) => {
    const fieldName = event.currentTarget.previousElementSibling?.name;

    if (fieldName) {
      this.setState({
        [fieldName]: "",
      });
    }
  };

  render() {
    return (
      <form className="contact-form" onSubmit={this.onFormSubmit}>
        <div className="form-elem">
          <input
            type="text"
            className="input-field"
            name="firstName"
            placeholder="First name"
            value={this.state.firstName || ""}
            onChange={this.onInputChange}
          />
          <span className="clear" onClick={this.onClearField}>
            ×
          </span>
        </div>

        <div className="form-elem">
          <input
            type="text"
            className="input-field"
            name="lastName"
            placeholder="Last name"
            value={this.state.lastName || ""}
            onChange={this.onInputChange}
          />
          <span className="clear" onClick={this.onClearField}>
            ×
          </span>
        </div>

        <div className="form-elem">
          <input
            type="email"
            className="input-field"
            name="email"
            placeholder="Email"
            value={this.state.email || ""}
            onChange={this.onInputChange}
          />
          <span className="clear" onClick={this.onClearField}>
            ×
          </span>
        </div>

        <div className="form-elem">
          <input
            type="tel"
            className="input-field"
            name="phone"
            placeholder="Phone"
            value={this.state.phone || ""}
            onChange={this.onInputChange}
          />
          <span className="clear" onClick={this.onClearField}>
            ×
          </span>
        </div>

        <div className="buttons">
          <button type="submit" className="primary-btn">
            Save
          </button>
          {this.state.id ? (
            <button
              type="button"
              className="secondary-btn"
              onClick={() => this.props.onDelete(this.state)}
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
}

export default ContactForm;
