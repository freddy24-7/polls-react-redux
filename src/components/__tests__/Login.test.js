import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './../Login';

describe('Login component', () => {
  test('renders user name field, password field, and submit button', () => {
    //Rendering the Login component
    render(<Login />);

    //Checking if the user name field is rendered
    const userNameField = screen.getByLabelText(/Select User:/i);
    expect(userNameField).toBeInTheDocument();

    //Checking if the password field is rendered
    const passwordField = screen.getByLabelText(/Password:/i);
    expect(passwordField).toBeInTheDocument();

    //Checking if the submit button is rendered
    const submitButton = screen.getByRole('button', { name: /Log in/i });
    expect(submitButton).toBeInTheDocument();
  });
});
