import React from 'react';
import { Navigate } from 'react-router-dom';
function Protected({ userId, children }) {
  if (!userId) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default Protected;
