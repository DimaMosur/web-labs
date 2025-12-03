import React from 'react';
import './Navigation.css';

const Navigation = () => {
    return (
        <nav className="navigation">
            <ul className="nav-list">
                <li className="nav-item active">🏠 Головна</li>
                <li className="nav-item">📖 Каталог</li>
                <li className="nav-item">⭐ Популярні</li>
                <li className="nav-item">🆕 Новинки</li>
                <li className="nav-item">ℹ️ Про нас</li>
            </ul>
        </nav>
    );
};

export default Navigation;