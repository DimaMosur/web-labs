import React from 'react';
import BookCard from './BookCard';
import './FeaturedBooks.css';

const FeaturedBooks = () => {
    const featuredBooks = [
        { id: 1, author: 'Оксана Забужко', pages: 320, price: 250 },
        { id: 2, author: 'Сергій Жадан', pages: 150, price: 180 },
        { id: 3, author: 'Андрій Курков', pages: 500, price: 300 },
        { id: 4, author: 'Любко Дереш', pages: 200, price: 220 },
    ];

    return (
        <section className="featured-books">
            <h2 className="section-title">⭐ Популярні книги</h2>
            <div className="books-grid">
                {featuredBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedBooks;