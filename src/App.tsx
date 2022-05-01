import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { AddContact } from "./components/AddContact";
import { PhoneBook } from "./components/PhoneBook";

function App() {

  const [phoneBookList, setPhoneBookList] = useState([]);

  const addContactHandler = (contact) => {

    let exists = phoneBookList.find((entry) => entry.phone === contact.phone)
    if (exists) {
      return false;
    }

    setPhoneBookList((prevState) => {
      return [...prevState, contact];
    });
    return true;
  }

  return (
    <div className="App">
      <AddContact addContactHandler={addContactHandler}></AddContact>
      <PhoneBook phoneBookList={phoneBookList}></PhoneBook>
    </div>

  );
}

export default App;
