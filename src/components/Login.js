import { users } from '../utils/_DATA';
import './Login.css';
import Button from './Button';
import Card from './Card';

// Login component
const Login = ({
  selectedUser,
  setSelectedUser,
  password,
  setPassword,
  errorMessage,
  handleLogin,
}) => {
  //Event handler for user selection
  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  return (
    <section className="base">
      <div className="container">
        <Card>
          <h2>Login Employee Polls</h2>
          <form onSubmit={handleLogin}>
            <label>
              Select User:
              <select value={selectedUser} onChange={handleUserChange}>
                <option value="">Select a user</option>
                {Object.values(users).map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {/* Display error message if it exists */}
            {errorMessage && <p className="error">{errorMessage}</p>}
            {/* Button component for login */}
            <Button type="submit">Log in</Button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default Login;
