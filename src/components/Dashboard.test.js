import React from 'react';
import '@testing-library/jest-dom';
import Dashboard from './Dashboard';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const store = mockStore({
    authedUser: 'user123', // Provide any initial state values needed for testing
    questions: {},
    users: {}
});

test('renders correctly', () => {
    const tree = renderer
        .create(
            <Provider store={store}>
                <Dashboard />
            </Provider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});