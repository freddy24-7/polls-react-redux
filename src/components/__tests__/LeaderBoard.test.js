import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LeaderBoard from '../LeaderBoard';

describe('LeaderBoard component', () => {
    const mockStore = configureStore([thunk]); // Apply the redux-thunk middleware
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
            // Add more sample users as needed
        },
    };
    const store = mockStore(initialState);

    test('renders user card with correct name', () => {
        render(
            <Provider store={store}>
                <LeaderBoard />
            </Provider>
        );

        // Check that the user card is rendered with the correct name
        expect(screen.getByText('Sarah Edo')).toBeInTheDocument();
    });
});
