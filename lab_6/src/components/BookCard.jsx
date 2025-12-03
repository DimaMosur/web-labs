import React from 'react';
import './BookCard.css';

const BookCard = ({ book }) => {
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
                    <button className="add-to-cart-btn">+ Кошик</button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;