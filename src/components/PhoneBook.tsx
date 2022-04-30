import React from "react";

export const PhoneBook = ({ phoneBookList }) => {

    console.log(phoneBookList);
    return <table>
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
            </tr>
        </thead>
        <tbody>
        {
            phoneBookList.map(({firstName, lastName, phone}) => {
                return <tr key={phone}> 
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{phone}</td>
                </tr>
            })
        }
        </tbody>
    </table>;
}