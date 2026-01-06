import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { catalogBooks } from '../data/booksData';
import './Catalog.css';

const Catalog = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // State для фільтрів та пошуку
    const [searchQuery, setSearchQuery] = useState('');
    const [priceFilter, setPriceFilter] = useState('all');
    const [pagesFilter, setPagesFilter] = useState('all');

    // Отримуємо параметр пошуку з URL при завантаженні
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchParam = params.get('search');
        if (searchParam) {
            setSearchQuery(searchParam);
        }
    }, [location.search]);

    const handleOpenDetails = (book) => {
        navigate(`/book/${book.id}`);
    };

    // Функція фільтрації книг
    const getFilteredBooks = () => {
        let filtered = [...catalogBooks];

        // Пошук по автору
        if (searchQuery.trim()) {
            filtered = filtered.filter(book => 
                book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                book.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Фільтр по ціні
        if (priceFilter !== 'all') {
            filtered = filtered.filter(book => {
                if (priceFilter === 'low') return book.price < 200;
                if (priceFilter === 'medium') return book.price >= 200 && book.price <= 280;
                if (priceFilter === 'high') return book.price > 280;
                return true;
            });
        }

        // Фільтр по кількості сторінок
        if (pagesFilter !== 'all') {
            filtered = filtered.filter(book => {
                if (pagesFilter === 'short') return book.pages < 250;
                if (pagesFilter === 'medium') return book.pages >= 250 && book.pages <= 400;
                if (pagesFilter === 'long') return book.pages > 400;
                return true;
            });
        }

        return filtered;
    };

    const filteredBooks = getFilteredBooks();

    // Функція скидання фільтрів
    const resetFilters = () => {
        setSearchQuery('');
        setPriceFilter('all');
        setPagesFilter('all');
    };

    return (
        <div className="catalog-page">
            <h1 className="catalog-title">📖 Каталог книг</h1>
            <p className="catalog-subtitle">Повний асортимент українських книг</p>
            
            {/* Панель фільтрів та пошуку */}
            <div className="filters-section">
                {/* Пошук */}
                <div className="search-container">
                    <input 
                        type="text"
                        className="search-input"
                        placeholder="🔍 Пошук по автору або опису..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Фільтри */}
                <div className="filters-container">
                    <div className="filter-group">
                        <label className="filter-label">💰 Ціна:</label>
                        <select 
                            className="filter-select"
                            value={priceFilter}
                            onChange={(e) => setPriceFilter(e.target.value)}
                        >
                            <option value="all">Всі ціни</option>
                            <option value="low">До 200 ₴</option>
                            <option value="medium">200-280 ₴</option>
                            <option value="high">Понад 280 ₴</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label className="filter-label">📄 Сторінки:</label>
                        <select 
                            className="filter-select"
                            value={pagesFilter}
                            onChange={(e) => setPagesFilter(e.target.value)}
                        >
                            <option value="all">Всі книги</option>
                            <option value="short">До 250 стор.</option>
                            <option value="medium">250-400 стор.</option>
                            <option value="long">Понад 400 стор.</option>
                        </select>
                    </div>

                    <button className="reset-btn" onClick={resetFilters}>
                        🔄 Скинути фільтри
                    </button>
                </div>

                {/* Інформація про результати */}
                <div className="results-info">
                    Знайдено: <strong>{filteredBooks.length}</strong> {filteredBooks.length === 1 ? 'книга' : 'книг'}
                </div>
            </div>

            {/* Сітка книг */}
            {filteredBooks.length > 0 ? (
                <div className="catalog-grid">
                    {filteredBooks.map(book => (
                        <BookCard 
                            key={book.id} 
                            book={book}
                            showDetailsButton={true}
                            onDetailsClick={handleOpenDetails}
                        />
                    ))}
                </div>
            ) : (
                <div className="no-results">
                    <h2>😔 Книги не знайдено</h2>
                    <p>Спробуйте змінити параметри пошуку або фільтри</p>
                    <button className="reset-btn" onClick={resetFilters}>
                        Скинути фільтри
                    </button>
                </div>
            )}
        </div>
    );
};

export default Catalog;
