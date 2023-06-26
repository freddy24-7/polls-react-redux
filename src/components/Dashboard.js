import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Dashboard.css';
import QuestionList from './QuestionList';
import initialDataLoader from '../utils/initialDataLoader';

const Dashboard = () => {
  const userId = useSelector((state) => state.authedUser);
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);
  const user = users[userId];

  console.log(questions);

  //Loading initial data
  initialDataLoader();

  useEffect(() => {
    const answeredQuestionIds = user ? Object.keys(user.answers) : [];
    const unansweredQuestionIds = Object.keys(questions).filter(
      (id) => !answeredQuestionIds.includes(id),
    );

    setAnsweredQuestionIds(answeredQuestionIds);
    setUnansweredQuestionIds(unansweredQuestionIds);
  }, [user, questions]);

  //State variables to store the recalculated question IDs
  const [answeredQuestionIds, setAnsweredQuestionIds] = React.useState([]);
  const [unansweredQuestionIds, setUnansweredQuestionIds] = React.useState([]);

  //Rendering nothing if the required data is not available yet
  if (!userId || !questions || !answeredQuestionIds || !unansweredQuestionIds) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <h5 className="h5">Welcome {user ? user.name : ''}</h5>
      {answeredQuestionIds.length > 0 && (
        <h2 className="h2">Questions already done</h2>
      )}
      <QuestionList
        questionIds={answeredQuestionIds}
        answeredQuestionIds={answeredQuestionIds}
      />
      {unansweredQuestionIds.length > 0 && (
        <h2 className="center">New Questions</h2>
      )}
      <QuestionList
        questionIds={unansweredQuestionIds}
        answeredQuestionIds={answeredQuestionIds}
      />
    </div>
  );
};

export default Dashboard;
