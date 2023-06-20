import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewQuestion from '../NewQuestion';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('NewQuestion', () => {
  test('should navigate to home after submission', () => {
    const dispatch = jest.fn(); // Mock dispatch function
    useDispatch.mockReturnValue(dispatch);

    const navigate = jest.fn(); // Mock navigate function
    useNavigate.mockReturnValue(navigate);

    render(<NewQuestion />);

    // Simulating typing in the form inputs
    fireEvent.change(screen.getByLabelText('Option One:'), {
      target: { value: 'Option 1' },
    });
    fireEvent.change(screen.getByLabelText('Option Two:'), {
      target: { value: 'Option 2' },
    });

    // Submitting the form
    fireEvent.submit(screen.getByText('Submit'));

    // Checking if the dispatch function is called with the correct arguments
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));

    // Checking if the navigate function is called with the correct argument
    expect(navigate).toHaveBeenCalledWith('/home');
  });
});
