import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Отримуємо кількість товарів з Redux store
    const totalItems = useSelector(state => state.totalItems);

    const handleSearchClick = () => {
        setShowSearchModal(true);
    };

    const handleCloseModal = () => {
        setShowSearchModal(false);
        setSearchQuery('');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
            handleCloseModal();
        }
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    return (
        <>
            <header className="header">
                <div className="header-content">
                    <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        <h1>📚 BookStore</h1>
                        <p className="tagline">Ваш світ українських книг</p>
                    </div>
                    <div className="header-actions">
                        <button className="search-btn" onClick={handleSearchClick}>
                            🔍 Пошук
                        </button>
                        <button className="cart-btn" onClick={handleCartClick}>
                            🛒 Кошик {totalItems > 0 && (
                                <span className="cart-badge">{totalItems}</span>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            {/* Модальне вікно пошуку */}
            {showSearchModal && (
                <div className="search-modal-overlay" onClick={handleCloseModal}>
                    <div className="search-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={handleCloseModal}>
                            ✕
                        </button>
                        <h2 className="search-modal-title">🔍 Пошук книг</h2>
                        <form onSubmit={handleSearch} className="search-form">
                            <input
                                type="text"
                                className="search-modal-input"
                                placeholder="Введіть назву автора або ключові слова..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                            <button type="submit" className="search-submit-btn">
                                Знайти
                            </button>
                        </form>
                        <p className="search-hint">
                            💡 Підказка: Спробуйте шукати за автором, наприклад "Забужко" або "Шевченко"
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
