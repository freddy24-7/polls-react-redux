import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchInitialData } from './dataLoader';

const InitialDataLoader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  // This component doesn't render anything
  return null;
};

export default InitialDataLoader;
