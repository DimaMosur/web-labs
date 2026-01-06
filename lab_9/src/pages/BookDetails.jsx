import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { getBookById } from '../api/booksApi';
import './BookDetails.css';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Завантаження книги з API
    useEffect(() => {
        const fetchBook = async () => {
            setLoading(true);
            setError(null);
            
            try {
                console.log(`🔍 Fetching book with ID: ${id}`);
                
                const response = await getBookById(parseInt(id));
                
                console.log('✅ Book fetched:', response);
                
                if (response.success) {
                    setBook(response.book);
                } else {
                    setError('Книгу не знайдено');
                }
            } catch (err) {
                console.error('❌ Error fetching book:', err);
                if (err.response && err.response.status === 404) {
                    setError('Книгу не знайдено');
                } else {
                    setError('Помилка підключення до сервера');
                }
            } finally {
                setLoading(false);
            }
        };
        
        fetchBook();
    }, [id]);

    // Показуємо spinner під час завантаження
    if (loading) {
        return (
            <div className="book-details-page">
                <Spinner type="book" text="Завантаження інформації про книгу..." />
            </div>
        );
    }

    // Показуємо помилку
    if (error || !book) {
        return (
            <div className="book-details-page">
                <div className="book-not-found">
                    <h1>😔 {error || 'Книгу не знайдено'}</h1>
                    <button onClick={() => navigate('/catalog')} className="back-btn">
                        ← Повернутись до каталогу
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="book-details-page">
            <button onClick={() => navigate(-1)} className="back-btn">
                ← Назад
            </button>

            <div className="book-details-content">
                <div className="book-details-header">
                    <div className="book-details-icon">📕</div>
                    <h1 className="book-details-title">{book.author}</h1>
                </div>

                <div className="book-details-info">
                    <div className="info-item">
                        <span className="info-label">📄 Сторінок:</span>
                        <span className="info-value">{book.pages}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">💰 Ціна:</span>
                        <span className="info-value">{book.price.toFixed(2)} ₴</span>
                    </div>
                </div>

                <div className="book-details-description">
                    <h2>📖 Опис:</h2>
                    <p>{book.description}</p>
                </div>

                <div className="book-details-actions">
                    <button className="add-to-cart-btn-large">
                        🛒 Додати в кошик
                    </button>
                    <button onClick={() => navigate('/catalog')} className="continue-btn">
                        Продовжити покупки →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
