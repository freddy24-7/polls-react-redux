import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { renderWithProviders } from '../../utils/test-utils/setup-test';
import Dashboard from '../Dashboard';
import rootReducer from '../../redux/index';

describe('Dashboard component', () => {
  it('should render the list of unanswered questions', () => {
    const unansweredQuestionIds = ['question3', 'question4'];
    const { queryByText } = renderWithProviders(<Dashboard />, {
      store: createStore(
        rootReducer,
        {
          users: { user1: { name: 'John Doe', answers: {} } },
          questions: {
            question3: { id: 'question3', text: 'Question 3' },
            question4: { id: 'question4', text: 'Question 4' },
          },
          authedUser: 'user1',
        },
        applyMiddleware(thunk),
      ),
    });
    expect(queryByText(/new questions/i)).toBeInTheDocument();
    expect(queryByText(/question 3/i)).toBeNull();
    expect(queryByText(/question 4/i)).toBeNull();
  });
});