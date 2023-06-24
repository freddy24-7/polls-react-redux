import React from 'react';
import { useSelector } from 'react-redux';
import './LeaderBoard.css';
import Card from './Card';
import { useInitialDataLoader } from '../utils/dataLoader';

const LeaderBoard = () => {
  const users = useSelector((state) => state.users);
  useInitialDataLoader();

  if (!users) {
    return null;
  }

  //Calculating the total score for each user
  const userScores = Object.values(users).map((user) => ({
    id: user.id,
    name: user.name,
    avatar: user.avatarURL,
    questionsAsked: user.questions.length,
    questionsAnswered: Object.keys(user.answers).length,
    totalScore: user.questions.length + Object.keys(user.answers).length,
  }));

  userScores.sort((a, b) => b.totalScore - a.totalScore);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-content">
        <h2 className="h2">Leaderboard</h2>
        <Card>
          {/* Wrap the user list in the Card component */}
          {userScores.map((user, index) => (
            <div key={user.id} className="user-card">
              <div className="user-avatar">
                <img src={user.avatar} alt={`Avatar of ${user.name}`} />
              </div>
              <div className="user-details">
                <h3>{user.name}</h3>
                <p>
                  Questions Asked: {user.questionsAsked} | Questions Answered:{' '}
                  {user.questionsAnswered}
                </p>
                <p>Total Score: {user.totalScore}</p>{' '}
                {/* Display the total score */}
              </div>
              <div className="user-rank">{index + 1}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default LeaderBoard;
