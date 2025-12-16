import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { catalogBooks } from '../data/booksData';
import './Catalog.css';

const Catalog = () => {
    const navigate = useNavigate();

    const handleOpenDetails = (book) => {
        navigate(`/book/${book.id}`);
    };

    return (
        <div className="catalog-page">
            <h1 className="catalog-title">📖 Каталог книг</h1>
            <p className="catalog-subtitle">Повний асортимент українських книг</p>
            
            <div className="catalog-grid">
                {catalogBooks.map(book => (
                    <BookCard 
                        key={book.id} 
                        book={book}
                        showDetailsButton={true}
                        onDetailsClick={handleOpenDetails}
                    />
                ))}
            </div>
        </div>
    );
};

export default Catalog;
