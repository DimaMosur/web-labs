import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions';
import './BookCard.css';

const BookCard = ({ book, showDetailsButton, onDetailsClick }) => {
    const dispatch = useDispatch();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        // Dispatch Redux action
        dispatch(addToCart(book));
        
        // Показуємо анімацію
        setAdded(true);
        
        // Прибираємо анімацію через 2 секунди
        setTimeout(() => {
            setAdded(false);
        }, 2000);
    };

    return (
        <div className="book-card">
            <div className="book-cover">
                <span className="book-icon">📕</span>
            </div>
            <div className="book-info">
                <h3 className="book-author">{book.author}</h3>
                <p className="book-pages">{book.pages} сторінок</p>
                <div className="book-footer">
                    <span className="book-price">{book.price.toFixed(2)} ₴</span>
                    <div className="book-actions">
                        {showDetailsButton && (
                            <button 
                                className="details-btn"
                                onClick={() => onDetailsClick(book)}
                            >
                                📖 Детальніше
                            </button>
                        )}
                        <button 
                            className={`add-to-cart-btn ${added ? 'added' : ''}`}
                            onClick={handleAddToCart}
                        >
                            {added ? '✓ Додано!' : '+ Кошик'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
