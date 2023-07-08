import React, { useEffect } from 'react';
import './Modal.css';

const Modal = ({ message }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('Modal closed:', false);
    }, 3500);

    //Cleaning up the timeout when the modal component unmounts
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="modal-container">
      <div className="modal-content">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
