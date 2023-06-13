// Dashboard component
import { connect } from 'react-redux'; // Importing the connect function from react-redux
import './Dashboard.css';

const Dashboard = (props) => {
  return (
    <div>
      <h3 className="center">Welcome {props.userId}</h3>
      <ul className="dashboard-list">
        {/* Render list items for each question ID */}
        {props.questionIds.map((id) => (
          <li key={id}>
            <div>QUESTION ID: {id}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ questions }) => ({
  questionIds: Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp,
  ),
});

export default connect(mapStateToProps)(Dashboard);
