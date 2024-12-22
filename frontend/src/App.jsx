import { useState, useEffect } from "react";

import "./App.css";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

function App() {
  //  SET STATE FOR CONTACTS
  const [contacts, setContacts] = useState([]);

  // MODAL STATE
  const [isModalOpen, setIsModalOpen] = useState(false);

  // CURRENT CONTACT STATE
  const [currentContact, setCurrentContact] = useState({});

  // USE EFFECT
  useEffect(() => {
    fetchContacts();
  }, []);

  // FETCH THE CONTACTS
  const fetchContacts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/contacts");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // GET JSON DATA
      const data = await response.json();
      setContacts(data.contacts);

      // SEE DATA IN CONSOLE
      console.log(data.contacts);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  // ADD NEW CONTACT TO STATE
  const addContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  // UPDATE CONTACT
  const updateContact = (updatedContact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  // MODAL FUNCTIONS
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact({});
  };

  const openCreateModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    }
  };

  const openEditModal = (contact) => {
    if (isModalOpen) return;
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchContacts();
  };

  return (
    <>
      <ContactList
        contacts={contacts}
        updateContact={openEditModal}
        updateCallback={onUpdate}
      />
      <button onClick={openCreateModal}>Create New Contact</button>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <ContactForm
              addContact={addContact}
              existingContact={currentContact}
              updateCallback={(updateContact, onUpdate)}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
