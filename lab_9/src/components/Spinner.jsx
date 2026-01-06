import React from 'react';
import './Spinner.css';

const Spinner = ({ type = 'default', text = 'Завантаження...', overlay = false }) => {
    const renderSpinner = () => {
        switch (type) {
            case 'book':
                return (
                    <div className="book-spinner">
                        <div className="book-page"></div>
                    </div>
                );
            
            case 'dots':
                return (
                    <div className="dots-loader">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                );
            
            case 'small':
                return <div className="spinner-small"></div>;
            
            default:
                return <div className="spinner"></div>;
        }
    };

    const content = (
        <div className="spinner-container">
            {renderSpinner()}
            {text && <p className="spinner-text">{text}</p>}
        </div>
    );

    if (overlay) {
        return (
            <div className="spinner-overlay">
                {content}
            </div>
        );
    }

    return content;
};

export default Spinner;
