import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
    const location = useLocation();
    
    return (
        <nav className="navigation">
            <ul className="nav-list">
                <Link to="/" className="nav-link">
                    <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                        🏠 Головна
                    </li>
                </Link>
                <Link to="/catalog" className="nav-link">
                    <li className={`nav-item ${location.pathname === '/catalog' ? 'active' : ''}`}>
                        📖 Каталог
                    </li>
                </Link>
                <li className="nav-item">⭐ Популярні</li>
                <li className="nav-item">🆕 Новинки</li>
                <li className="nav-item">ℹ️ Про нас</li>
            </ul>
        </nav>
    );
};

export default Navigation;
