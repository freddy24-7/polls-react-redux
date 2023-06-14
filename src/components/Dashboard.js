// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import './Dashboard.css';
// import { formatDate } from '../utils/helpers';
// import Button from './Button';
// import { handleInitialData } from '../actions/shared';
//
// const Dashboard = () => {
//   const userId = useSelector((state) => state.authedUser);
//   const questions = useSelector((state) => state.questions);
//   const users = useSelector((state) => state.users);
//   const dispatch = useDispatch();
//
//   const user = users[userId];
//   const answeredQuestionIds = user ? Object.keys(user.answers) : [];
//   const unansweredQuestionIds = Object.keys(questions).filter(
//     (id) => !answeredQuestionIds.includes(id),
//   );
//
//   const [expandedQuestions, setExpandedQuestions] = useState([]);
//
//   const handleToggleQuestion = (questionId) => {
//     // Toggle the expanded state of the question
//     const expanded = expandedQuestions.includes(questionId);
//     const updatedQuestions = expanded
//       ? expandedQuestions.filter((id) => id !== questionId)
//       : [...expandedQuestions, questionId];
//     setExpandedQuestions(updatedQuestions);
//   };
//
//   const renderQuestionList = (questionIds) => {
//     const filteredQuestionIds = questionIds
//       .filter((id) => questions[id] && questions[id].author)
//       .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
//
//     return (
//       <div className="question-list">
//         {filteredQuestionIds.map((id) => (
//           <div
//             key={id}
//             className={`question-card ${
//               expandedQuestions.includes(id) ? 'expanded' : ''
//             }`}
//           >
//             <div className="card-header">
//               <span>{questions[id].author}</span>
//             </div>
//             <div className="center">
//               <span>{formatDate(questions[id].timestamp)}</span>
//             </div>
//             <div className="card-body">
//               {expandedQuestions.includes(id) &&
//                 questions[id].optionOne &&
//                 questions[id].optionTwo && (
//                   <p className="question-text">
//                     {questions[id].optionOne.text}
//                     {questions[id].optionTwo.text}
//                   </p>
//                 )}
//             </div>
//             <div className="center">
//               <Button onClick={() => handleToggleQuestion(id)}>
//                 Show Question
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };
//
//   const filteredUnansweredQuestionIds = unansweredQuestionIds
//     .filter((id) => questions[id] !== undefined)
//     .sort((a, b) => questions[b].timestamp - questions[a].timestamp);
//
//   useEffect(() => {
//     // Fetch and dispatch initial data
//     dispatch(handleInitialData());
//   }, [dispatch]);
//
//   if (!userId || !questions || !answeredQuestionIds || !unansweredQuestionIds) {
//     return null;
//   }
//
//   return (
//     <div className="dashboard-container">
//       <h5 className="h5">Welcome {user ? user.name : ''}</h5>
//       <h2 className="h2">Questions already done</h2>
//       {renderQuestionList(answeredQuestionIds)}
//       <h2 className="center">New Questions</h2>
//       {renderQuestionList(filteredUnansweredQuestionIds)}
//     </div>
//   );
// };
//
// export default Dashboard;
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Dashboard.css';
import { formatDate } from '../utils/helpers';
import Button from './Button';
import { handleInitialData } from '../actions/shared';

const Dashboard = () => {
  const userId = useSelector((state) => state.authedUser);
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const user = users[userId];
  const answeredQuestionIds = user ? Object.keys(user.answers) : [];
  const unansweredQuestionIds = Object.keys(questions).filter(
    (id) => !answeredQuestionIds.includes(id),
  );

  const [expandedQuestions, setExpandedQuestions] = useState([]);

  const handleToggleQuestion = (questionId) => {
    // Toggle the expanded state of the question
    const expanded = expandedQuestions.includes(questionId);
    const updatedQuestions = expanded
      ? expandedQuestions.filter((id) => id !== questionId)
      : [...expandedQuestions, questionId];
    setExpandedQuestions(updatedQuestions);
  };

  const renderQuestionList = (questionIds) => {
    const filteredQuestionIds = questionIds
      .filter((id) => questions[id] && questions[id].author)
      .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

    return (
      <div className="question-list">
        {filteredQuestionIds.map((id) => (
          <div
            key={id}
            className={`question-card ${
              expandedQuestions.includes(id) ? 'expanded' : ''
            }`}
          >
            <div className="card-header">
              <span>{questions[id].author}</span>
            </div>
            <div className="center">
              <span>{formatDate(questions[id].timestamp)}</span>
            </div>
            <div className="card-body">
              {expandedQuestions.includes(id) &&
                questions[id].optionOne &&
                questions[id].optionTwo && (
                  <div>
                    <p className="question-text">Would you rather?</p>
                    <ul className="options-list">
                      <li>{questions[id].optionOne.text}</li>
                      <li>{questions[id].optionTwo.text}</li>
                    </ul>
                  </div>
                )}
            </div>
            <div className="center">
              <Button onClick={() => handleToggleQuestion(id)}>
                Show Question
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const filteredUnansweredQuestionIds = unansweredQuestionIds
    .filter((id) => questions[id] !== undefined)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  useEffect(() => {
    // Fetch and dispatch initial data
    dispatch(handleInitialData());
  }, [dispatch]);

  if (!userId || !questions || !answeredQuestionIds || !unansweredQuestionIds) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <h5 className="h5">Welcome {user ? user.name : ''}</h5>
      <h2 className="h2">Questions already done</h2>
      {renderQuestionList(answeredQuestionIds)}
      <h2 className="center">New Questions</h2>
      {renderQuestionList(filteredUnansweredQuestionIds)}
    </div>
  );
};

export default Dashboard;
