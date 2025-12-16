import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <h1>📚 BookStore</h1>
                    <p className="tagline">Ваш світ українських книг</p>
                </div>
                <div className="header-actions">
                    <button className="search-btn">🔍 Пошук</button>
                    <button className="cart-btn">🛒 Кошик (0)</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
