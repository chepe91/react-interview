import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { AddContact } from "./components/AddContact";
import { PhoneBook } from "./components/PhoneBook";

function App() {

  const [phoneBookList, setPhoneBookList] = useState([]);

  const addedContact = (contact) => {

    
    setPhoneBookList((prevState) => {
        return [...prevState, contact];
    });
  }

  return (
    <div className="App">
        <AddContact addedContact={addedContact}></AddContact>
        <PhoneBook phoneBookList={phoneBookList}></PhoneBook>
    </div>

  );
}

export default App;
