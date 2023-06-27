import Card from './Card';
import './NotFound.css';

const NotFound = ({ handleLogout }) => {
  //README: Allows the logout after hitting NotFound
  //README: Here silenced as not needed for this project
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  //
  // useEffect(() => {
  //
  //   const logoutTimer = setTimeout(() => {
  //     handleLogout();
  //     navigate('/');
  //   }, 3000);
  //
  //   return () => {
  //     clearTimeout(logoutTimer);
  //   };
  // }, [dispatch, navigate, handleLogout]);

  return (
    <div className="not-found-container">
      <Card className="not-found-card">
        <h2 className="not-found-title">404 - Page Not Found</h2>
        <p className="not-found-text">
          The requested poll question does not exist.
        </p>
        <p className="not-found-text">Please click "Home" to continue.</p>
      </Card>
    </div>
  );
};

export default NotFound;
