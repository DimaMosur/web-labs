import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from './BookCard';
import Spinner from './Spinner';
import { getFeaturedBooks } from '../api/booksApi';
import './FeaturedBooks.css';

const FeaturedBooks = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Завантаження книг з API при монтуванні компонента
    useEffect(() => {
        const fetchFeaturedBooks = async () => {
            setLoading(true);
            setError(null);

            try {
                console.log('🔍 Fetching featured books from API...');

                // Завантажуємо популярні книги
                const response = await getFeaturedBooks();

                console.log('✅ Featured books fetched:', response);

                if (response.success) {
                    setBooks(response.books);
                } else {
                    setError('Не вдалося завантажити популярні книги');
                }
            } catch (err) {
                console.error('❌ Error fetching featured books:', err);
                setError('Помилка підключення до сервера');
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedBooks();
    }, []); // Порожній масив - завантажуємо лише один раз при монтуванні

    const handleOpenDetails = (book) => {
        navigate(`/book/${book.id}`);
    };

    // Показуємо spinner під час завантаження
    if (loading) {
        return (
            <section className="featured-books">
                <h2 className="section-title">⭐ Популярні книги</h2>
                <Spinner type="dots" text="Завантаження популярних книг..." />
            </section>
        );
    }

    // Показуємо помилку якщо не вдалося завантажити
    if (error) {
        return (
            <section className="featured-books">
                <h2 className="section-title">⭐ Популярні книги</h2>
                <div className="featured-error">
                    <p>😔 {error}</p>
                </div>
            </section>
        );
    }

    // Показуємо книги
    return (
        <section className="featured-books">
            <h2 className="section-title">⭐ Популярні книги</h2>
            <div className="books-grid">
                {books.map(book => (
                    <BookCard
                        key={book.id}
                        book={book}
                        showDetailsButton={true}
                        onDetailsClick={handleOpenDetails}
                    />
                ))}
            </div>
        </section>
    );
};

export default FeaturedBooks;