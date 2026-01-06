import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BookCard from '../components/BookCard';
import Spinner from '../components/Spinner';
import { getAllBooks } from '../api/booksApi';
import './Catalog.css';

const Catalog = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // State для книг
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
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

    // Функція для завантаження книг з API
    const fetchBooks = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Формуємо фільтри для API запиту
            const filters = {
                price: priceFilter,
                pages: pagesFilter,
                search: searchQuery
            };
            
            console.log('🔍 Fetching books with filters:', filters);
            
            // Робимо GET запит через axios
            const response = await getAllBooks(filters);
            
            console.log('✅ Books fetched:', response);
            
            if (response.success) {
                setBooks(response.books);
            } else {
                setError('Не вдалося завантажити книги');
            }
        } catch (err) {
            console.error('❌ Error fetching books:', err);
            setError('Помилка підключення до сервера. Переконайтесь що Flask сервер запущено.');
        } finally {
            setLoading(false);
        }
    };

    // Завантажуємо книги при зміні фільтрів
    useEffect(() => {
        fetchBooks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [priceFilter, pagesFilter, searchQuery]);

    const handleOpenDetails = (book) => {
        navigate(`/book/${book.id}`);
    };

    // Функція скидання фільтрів
    const resetFilters = () => {
        setSearchQuery('');
        setPriceFilter('all');
        setPagesFilter('all');
    };

    // Якщо завантаження - показуємо spinner
    if (loading) {
        return (
            <div className="catalog-page">
                <h1 className="catalog-title">📖 Каталог книг</h1>
                <Spinner type="book" text="Завантаження книг..." />
            </div>
        );
    }

    // Якщо помилка - показуємо повідомлення
    if (error) {
        return (
            <div className="catalog-page">
                <h1 className="catalog-title">📖 Каталог книг</h1>
                <div className="error-message">
                    <h2>😔 Виникла помилка</h2>
                    <p>{error}</p>
                    <button className="retry-btn" onClick={fetchBooks}>
                        🔄 Спробувати знову
                    </button>
                </div>
            </div>
        );
    }

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
                    Знайдено: <strong>{books.length}</strong> {books.length === 1 ? 'книга' : books.length > 1 && books.length < 5 ? 'книги' : 'книг'}
                </div>
            </div>

            {/* Сітка книг */}
            {books.length > 0 ? (
                <div className="catalog-grid">
                    {books.map(book => (
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
