import React from 'react';
import '@testing-library/jest-dom';
import Dashboard from '../Dashboard';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const store = mockStore({
  authedUser: 'user123',
  questions: {
    question1: { id: 'question1', text: 'Question 1' },
    question2: { id: 'question2', text: 'Question 2' },
  },
  users: {
    user123: { name: 'John Doe', answers: {} },
  },
});

test('renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Dashboard />
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
