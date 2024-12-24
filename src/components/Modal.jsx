// src/components/Modal.jsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Modal = ({ children, onClose }) => {
  // Ensure the modal-root exists
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    console.error("Modal root element with id 'modal-root' not found.");
    return null;
  }

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Close modal on Escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      onClick={onClose} // Close modal on outside click
    >
      <div
        className='bg-white max-w-[40%] p-6 rounded-xl shadow-lg relative'
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
