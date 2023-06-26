// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import './Dashboard.css';
// import QuestionList from './QuestionList';
// import { useInitialDataLoader } from '../utils/dataLoader';
//
// const Dashboard = () => {
//   const userId = useSelector((state) => state.authedUser);
//   const questions = useSelector((state) => state.questions);
//   const users = useSelector((state) => state.users);
//   const user = users[userId];
//   const [answeredQuestionIds, setAnsweredQuestionIds] = useState([]);
//   const [unansweredQuestionIds, setUnansweredQuestionIds] = useState([]);
//
//   useInitialDataLoader(); // Load initial data
//
//   useEffect(() => {
//     if (users && questions) {
//       const answeredQuestionIds = user ? Object.keys(user.answers) : [];
//       const unansweredQuestionIds = Object.keys(questions).filter(
//         (id) => !answeredQuestionIds.includes(id),
//       );
//
//       setAnsweredQuestionIds(answeredQuestionIds);
//       setUnansweredQuestionIds(unansweredQuestionIds);
//     }
//   }, [user, users, questions]);
//
//   if (
//     !users ||
//     !questions ||
//     answeredQuestionIds.length === 0 ||
//     unansweredQuestionIds.length === 0
//   ) {
//     return null;
//   }
//
//   return (
//     <div className="dashboard-container">
//       <h5 className="h5">Welcome {user ? user.name : ''}</h5>
//       {answeredQuestionIds.length > 0 && (
//         <h2 className="h2">Questions already done</h2>
//       )}
//       <QuestionList
//         questionIds={answeredQuestionIds}
//         answeredQuestionIds={answeredQuestionIds}
//       />
//       {unansweredQuestionIds.length > 0 && (
//         <h2 className="center">New Questions</h2>
//       )}
//       <QuestionList
//         questionIds={unansweredQuestionIds}
//         answeredQuestionIds={answeredQuestionIds}
//       />
//     </div>
//   );
// };
//
// export default Dashboard;
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useInitialDataLoader from '../utils/initialDataLoader';
import './Dashboard.css';
import QuestionList from './QuestionList';

const Dashboard = () => {
  const userId = useSelector((state) => state.authedUser);
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);
  const user = users[userId];

  // Custom hook to load initial data
  useInitialDataLoader();

  // Compute answered and unanswered question IDs
  const answeredQuestionIds = user ? Object.keys(user.answers) : [];
  const unansweredQuestionIds = Object.keys(questions).filter(
    (id) => id !== 'newQuestion' && !answeredQuestionIds.includes(id),
  );

  // Wait for initial data to be loaded
  if (
    Object.keys(users).length === 0 ||
    Object.keys(questions).length === 0 ||
    answeredQuestionIds.length === 0 ||
    unansweredQuestionIds.length === 0
  ) {
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
