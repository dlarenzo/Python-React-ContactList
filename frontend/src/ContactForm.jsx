import { useState } from "react";
import PropTypes from "prop-types";

const ContactForm = ({
  addContact,
  existingContact = {},
  updateCallback,
  closeModal,
}) => {
  const [firstName, setFirstName] = useState(existingContact.firstName || "");
  const [lastName, setLastName] = useState(existingContact.lastName || "");
  const [email, setEmail] = useState(existingContact.email || "");

  const updating = Object.entries(existingContact).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
    };

    const url = `http://127.0.0.1:5000/${
      updating ? `update_contact/${existingContact.id}` : "create_contact"
    }`;
    const options = {
      method: updating ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        const data = await response.json();
        if (updating) {
          updateCallback(data.contact);
        } else {
          alert("Contact added successfully");
          addContact(data.contact);
        }
        closeModal();
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
      alert("Failed to add contact. Please try again later.");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form">
        <div className="input-container">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">{updating ? "Update" : "Create"}</button>
      </div>
    </form>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  existingContact: PropTypes.object,
  updateCallback: PropTypes.func,
  closeModal: PropTypes.func.isRequired,
};

export default ContactForm;
