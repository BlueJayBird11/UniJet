// Modal.tsx
import React from 'react';

interface ModalProps {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ title, message, confirmText, cancelText, onConfirm, onCancel, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1050,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        backgroundColor: '#FFF',
        padding: '30px',
        borderRadius: '15px',
        maxWidth: '400px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
      }}>
        <h2 style={{ marginTop: 0 }}>{title}</h2>
        <p>{message}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button onClick={onCancel} style={{
            backgroundColor: '#CCC',
            color: '#333',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px',
          }}>{cancelText}</button>
          <button onClick={onConfirm} style={{
            backgroundColor: '#007BFF',
            color: '#FFF',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
