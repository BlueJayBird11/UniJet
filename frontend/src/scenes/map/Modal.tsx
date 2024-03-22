// Modal.tsx
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText: string;
    onConfirm: () => void;
    onCancel?: () => void;
    cancelText?: string;
    additionalInfo?: JSX.Element;
}

const Modal: React.FC<ModalProps> = ({
    isOpen, 
    title, 
    message, 
    confirmText, 
    cancelText, 
    onConfirm, 
    onCancel, 
    additionalInfo
}) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', 
            top: 0, 
            left: 0, 
            zIndex: 1050, 
            width: '100%', 
            height: '100%', 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center'
        }}>
            <div style={{
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '10px', 
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                maxWidth: '400px'
            }}>
                <h2>{title}</h2>
                <p>{message}</p>
                {additionalInfo}
                <div style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <button onClick={onConfirm} style={{
                        backgroundColor: '#4CAF50', 
                        color: 'white', 
                        padding: '10px 20px', 
                        borderRadius: '5px', 
                        cursor: 'pointer'
                    }}>{confirmText}</button>
{cancelText && onCancel && (
    <button onClick={onCancel} style={{
        backgroundColor: '#f44336',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginLeft: '10px', // Ensure there is space between buttons
    }}>
        {cancelText}
    </button>
)}





                </div>
            </div>
        </div>
    );
};

export default Modal;
