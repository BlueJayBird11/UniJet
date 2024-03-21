// Modal.tsx
import React from 'react';

interface ModalProps {
    title: string;
    message: string;
    confirmText: string;
    onConfirm: () => void;
    onCancel?: () => void; // This is optional
    cancelText?: string; // This is optional
    isOpen: boolean;
    additionalInfo?: JSX.Element; // For additional information like driver details
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
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)'
            }}>
                <h2 style={{ marginTop: 0 }}>{title}</h2>
                <p>{message}</p>
                {additionalInfo}
                <div style={{
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    marginTop: '20px'
                }}>
                    <button onClick={onConfirm} style={{
                        marginRight: '10px', 
                        backgroundColor: '#4CAF50', 
                        color: 'white', 
                        padding: '10px 20px', 
                        borderRadius: '5px', 
                        cursor: 'pointer'
                    }}>
                        {confirmText}
                    </button>
                    {onCancel && cancelText && ( // Only render if both onCancel and cancelText are provided
                        <button onClick={onCancel} style={{
                            backgroundColor: '#f44336', 
                            color: 'white', 
                            padding: '10px 20px', 
                            borderRadius: '5px', 
                            cursor: 'pointer'
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
