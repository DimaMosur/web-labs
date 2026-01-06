import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { featuredBooks, catalogBooks } from '../data/booksData';
import './BookDetails.css';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const allBooks = [...featuredBooks, ...catalogBooks];
    const book = allBooks.find(b => b.id === parseInt(id));

    if (!book) {
        return (
            <div className="book-details-page">
                <div className="book-not-found">
                    <h1>😔 Книгу не знайдено</h1>
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
