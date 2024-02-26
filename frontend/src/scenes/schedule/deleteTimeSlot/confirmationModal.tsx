import React, { useEffect } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onCancel, onConfirm }) => {
  // Close the modal when pressing the Escape key
  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onCancel();
    }
  };

  // Add event listeners when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen]);

  return (
    <div className={`fixed inset-0 z-50 flex justify-center items-center ${isOpen ? '' : 'hidden'}`} onClick={onCancel}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded shadow-lg">
        <p className="mb-4">Are you sure you want to delete this item?</p>
        <div className="flex justify-end">
          <button className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 mr-2 rounded" onClick={onCancel}>Cancel</button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
