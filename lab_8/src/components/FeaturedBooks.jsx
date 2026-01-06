import React from 'react';
import BookCard from './BookCard';
import { featuredBooks } from '../data/booksData';
import './FeaturedBooks.css';

const FeaturedBooks = () => {
    return (
        <section className="featured-books">
            <h2 className="section-title">⭐ Популярні книги</h2>
            <div className="books-grid">
                {featuredBooks.map(book => (
                    <BookCard 
                        key={book.id} 
                        book={book}
                        showDetailsButton={false}
                    />
                ))}
            </div>
        </section>
    );
};

export default FeaturedBooks;
