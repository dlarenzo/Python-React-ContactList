import { useState, useEffect } from "react";

import "./App.css";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

function App() {
  //  SET STATE FOR CONTACTS
  const [contacts, setContacts] = useState([]);

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

  return (
    <>
      <ContactList contacts={contacts} />
      <ContactForm addContact={addContact} />
    </>
  );
}

export default App;
