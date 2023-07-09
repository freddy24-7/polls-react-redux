import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import NewQuestion from '../NewQuestion';
import { saveQuestion } from '../../redux/questionsSlice';

describe('NewQuestion', () => {
  const mockStore = configureStore([]);
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      authedUser: 'sarahedo',
    });

    store.dispatch = jest.fn();

    // eslint-disable-next-line testing-library/no-render-in-setup
    component = render(
      <Provider store={store}>
        <Router>
          <NewQuestion />
        </Router>
      </Provider>,
    );
  });

  it('should dispatch saveQuestion action on form submission', () => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const optionOneInput = component.getByLabelText('Option One:');
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const optionTwoInput = component.getByLabelText('Option Two:');
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const submitButton = component.getByText('Submit');

    fireEvent.change(optionOneInput, { target: { value: 'Option 1' } });
    fireEvent.change(optionTwoInput, { target: { value: 'Option 2' } });
    fireEvent.click(submitButton);

    expect(store.dispatch).toHaveBeenCalledTimes(2); // saveQuestion and resetState
    expect(store.dispatch).toHaveBeenCalledWith(
      saveQuestion({
        questionId: expect.any(String),
        optionOneText: 'Option 1',
        optionTwoText: 'Option 2',
        author: 'sarahedo',
      }),
    );
  });

  it('should display modal with error message for invalid question length', () => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const optionOneInput = component.getByLabelText('Option One:');
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const optionTwoInput = component.getByLabelText('Option Two:');
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const submitButton = component.getByText('Submit');

    fireEvent.change(optionOneInput, {
      target: {
        value:
          'Very long question text that exceeds the maximum allowed length.',
      },
    });
    fireEvent.change(optionTwoInput, { target: { value: 'Option 2' } });
    fireEvent.click(submitButton);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const modal = component.getByText(
      'Question length should be maximum 50 characters.',
    );
    expect(modal).toBeInTheDocument();
  });

  it('should display modal with error message for equal alternatives', () => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const optionOneInput = component.getByLabelText('Option One:');
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const optionTwoInput = component.getByLabelText('Option Two:');
    // eslint-disable-next-line testing-library/prefer-screen-queries
    const submitButton = component.getByText('Submit');

    fireEvent.change(optionOneInput, { target: { value: 'Option' } });
    fireEvent.change(optionTwoInput, { target: { value: 'Option' } });
    fireEvent.click(submitButton);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const modal = component.getByText('The two alternatives cannot be equal.');
    expect(modal).toBeInTheDocument();
  });
});
