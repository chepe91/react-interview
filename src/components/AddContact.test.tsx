import React from 'react'

import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { AddContact } from "./AddContact";

test('should render 3 inputs', async () => {
    const addContactHandler = () => { }
    render(<AddContact addContactHandler={addContactHandler} />)

    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(3);
});


test('save a contact', async () => {
    const addContactHandler = () => { return true; }
    render(<AddContact addContactHandler={addContactHandler} />)

    const inputs = screen.getAllByRole("textbox");

    fireEvent.change(inputs[0], {target: {value: 'Juan'}})
    fireEvent.change(inputs[1], {target: {value: 'Perez Perez'}})
    fireEvent.change(inputs[2], {target: {value: '123'}})

    expect(inputs[0].value).toBe("Juan");
    expect(inputs[1].value).toBe("Perez Perez");
    expect(inputs[2].value).toBe("123");

    fireEvent.click(screen.getByText(/Add/i))

    expect(inputs[0].value).toBe("");
    expect(inputs[1].value).toBe("");
    expect(inputs[2].value).toBe("");
});

test('contact already exists', async () => {
    const addContactHandler = () => { return false; }
    render(<AddContact addContactHandler={addContactHandler} />)

    let inputs = screen.getAllByRole("textbox");

    fireEvent.change(inputs[0], {target: {value: 'Juan'}})
    fireEvent.change(inputs[1], {target: {value: 'Perez Perez'}})
    fireEvent.change(inputs[2], {target: {value: '123'}})

    expect(inputs[0].value).toBe("Juan");
    expect(inputs[1].value).toBe("Perez Perez");
    expect(inputs[2].value).toBe("123");

    fireEvent.click(screen.getByText(/Add/i))

    const errorMessage = screen.getByText(/Phone already exists/i);
    expect(errorMessage).toBeInTheDocument();
});

test('first name empty', async () => {
    const addContactHandler = () => { return false; }
    render(<AddContact addContactHandler={addContactHandler} />)

    fireEvent.click(screen.getByText(/Add/i))
    const errorMessage = screen.getByText(/first name is mandatory/i);
    expect(errorMessage).toBeInTheDocument();
});

test('last name empty', async () => {
    const addContactHandler = () => { return false; }
    render(<AddContact addContactHandler={addContactHandler} />)

    let inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], {target: {value: 'Juan'}})

    fireEvent.click(screen.getByText(/Add/i))
    const errorMessage = screen.getByText(/last name is mandatory/i);
    expect(errorMessage).toBeInTheDocument();
});

test('phone empty', async () => {
    const addContactHandler = () => { return false; }
    render(<AddContact addContactHandler={addContactHandler} />)

    let inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], {target: {value: 'Juan'}})
    fireEvent.change(inputs[1], {target: {value: 'Perez Perez'}})

    fireEvent.click(screen.getByText(/Add/i))
    const errorMessage = screen.getByText(/phone is mandatory/i);
    expect(errorMessage).toBeInTheDocument();
});

test('phone only numbers', async () => {
    const addContactHandler = () => { return false; }
    render(<AddContact addContactHandler={addContactHandler} />)

    let inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[2], {target: {value: 'Perez'}})
    expect(inputs[2].value).toBe("");
    
    fireEvent.change(inputs[2], {target: {value: '1234'}})
    expect(inputs[2].value).toBe("1234");
});