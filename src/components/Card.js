import React from 'react';
import './Card.css';

// Card component
const Card = ({ children }) => {
  return <div className="card">{children}</div>;
};

export default Card;
