import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import Dashboard from '../Dashboard';

// Mocking the react-redux hooks
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mocking the showLoading and hideLoading functions from react-redux-loading-bar
jest.mock('react-redux-loading-bar', () => ({
  showLoading: jest.fn(),
  hideLoading: jest.fn(),
}));

// Mocking the handleInitialData function from the shared actions
jest.mock('../../actions/shared', () => ({
  handleInitialData: jest.fn(),
}));

describe('Dashboard', () => {
  test('should group answers correctly into "Questions already done" and "New Questions"', () => {
    const dispatch = jest.fn(); // Mock dispatch function
    useDispatch.mockReturnValue(dispatch);

    useSelector.mockReturnValueOnce('user123'); // Mock authedUser
    useSelector.mockReturnValueOnce({
      question1: { author: 'user123' },
      question2: { author: 'user123' },
      question3: { author: 'user123' },
    }); // Mock questions
    useSelector.mockReturnValueOnce({
      user123: {
        answers: {
          question1: 'optionOne',
          question3: 'optionTwo',
        },
      },
    }); // Mock users
    useSelector.mockReturnValueOnce(['question1', 'question2', 'question3']); // Mock answeredQuestionIds
    useSelector.mockReturnValueOnce(['question2']); // Mock unansweredQuestionIds

    render(<Dashboard />);

    expect(screen.getByText('Questions already done')).toBeInTheDocument();
    expect(screen.getByText('New Questions')).toBeInTheDocument();
  });
});
