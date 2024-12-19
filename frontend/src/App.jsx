import { useState, useEffect } from "react";

import "./App.css";

function App() {
  //  SET STATE FOR CONTACTS
  const [contacts, setContacts] = useState([]);

  // USE EFFECT
  useEffect(() => {
    fetchContacts();
  }, []);

  // FETCH THE CONTACTS
  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    // GET JSON DATA
    const data = await response.json();
    setContacts(data.contacts);

    // SEE DATA IN CONSOLE
    console.log(data.contacts);
  };

  return <></>;
}

export default App;
