import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './../Login';

describe('Login component', () => {
  test('renders user name field, password field, and submit button', () => {
    render(<Login />);

    const userNameField = screen.getByLabelText(/Select User:/i);
    expect(userNameField).toBeInTheDocument();

    const passwordField = screen.getByLabelText(/Password:/i);
    expect(passwordField).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /Log in/i });
    expect(submitButton).toBeInTheDocument();
  });
});
