import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LeaderBoard from '../LeaderBoard';

describe('LeaderBoard component', () => {
  // Configuring the mock store with the thunk middleware
  const mockStore = configureStore([thunk]);

  // Defining the initial state of the store
  const initialState = {
    users: {
      sarahedo: {
        id: 'sarahedo',
        name: 'Sarah Edo',
        avatarURL: 'avatar-sarahedo.jpg',
        questions: ['qid1', 'qid2'],
        answers: {
          qid3: 'optionOne',
          qid4: 'optionTwo',
        },
      },
    },
  };

  //Creating a mock store instance with the initial state
  const store = mockStore(initialState);

  //Defining the test case
  test('renders user card with correct name', () => {
    // Render the LeaderBoard component with the Provider and the mock store
    render(
      <Provider store={store}>
        <LeaderBoard />
      </Provider>,
    );

    //Checking that the user card is rendered with the correct name
    expect(screen.getByText('Sarah Edo')).toBeInTheDocument();
  });
});
