import React, { useState } from "react";

export const AddContact = ({ addContactHandler }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onChangePhoneHandler = (e) => {
        const phone = e.target.value;
        let regex = /^\d*$/;
        if (regex.test(phone)) {
            setPhone(phone);
        } else {
            e.preventDefault();
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (firstName === "") {
            setErrorMessage("first name is mandatory");
            return;
        }

        if (lastName === "") {
            setErrorMessage("last name is mandatory");
            return;
        }

        if (phone === "") {
            setErrorMessage("phone is mandatory");
            return;
        }

        let contact = {
            firstName,
            lastName,
            phone
        }

        const added = addContactHandler(contact);
        if(!added){
            setErrorMessage("Phone already exists");
        } else {
            setErrorMessage("");
            setFirstName("");
            setLastName("");
            setPhone("");
        }
    }

    return <form onSubmit={onSubmitHandler}>
        <input
            onChange={(e) => { setFirstName(e.target.value) }}
            value={firstName}
        />
        <br />
        <input
            onChange={(e) => { setLastName(e.target.value) }}
            value={lastName}
        />
        <br />
        <input
            onChange={onChangePhoneHandler}
            value={phone}
        />
        {errorMessage && <div><br /><span>{errorMessage}</span></div>}
        <br />
        <button type="submit">Add</button>
    </form>
}

