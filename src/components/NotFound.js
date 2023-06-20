import { useNavigate } from 'react-router-dom';
import Card from './Card';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './NotFound.css';

const NotFound = ({ handleLogout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirecting to the home page after 3 seconds
  useEffect(() => {
    const logoutTimer = setTimeout(() => {
      handleLogout();
      navigate('/');
    }, 3000);

    return () => {
      clearTimeout(logoutTimer);
    };
  }, [dispatch, navigate, handleLogout]);

  return (
    <div className="not-found-container">
      <Card className="not-found-card">
        <h2 className="not-found-title">404 - Page Not Found</h2>
        <p className="not-found-text">The requested poll does not exist.</p>
      </Card>
    </div>
  );
};

export default NotFound;
