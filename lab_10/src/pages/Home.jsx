import React, { useState } from 'react';
import Hero from '../components/Hero';
import FeaturedBooks from '../components/FeaturedBooks';
import './Home.css';

const Home = () => {
    // State для відображення додаткового контенту
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <>
            <Hero />
            <FeaturedBooks />
            
            <section className="extra-content">
                <div className="extra-content-header">
                    <h2 className="section-title">📚 Чому варто обирати нас?</h2>
                    <p className="section-subtitle">
                        Найкращий онлайн-магазин української літератури
                    </p>
                </div>

                <div className="benefits-grid">
                    <div className="benefit-card">
                        <span className="benefit-icon">🚚</span>
                        <h3>Швидка доставка</h3>
                        <p>Доставляємо книги по всій Україні протягом 1-3 днів</p>
                    </div>
                    <div className="benefit-card">
                        <span className="benefit-icon">💳</span>
                        <h3>Зручна оплата</h3>
                        <p>Оплата онлайн або при отриманні - як вам зручно</p>
                    </div>
                    <div className="benefit-card">
                        <span className="benefit-icon">📖</span>
                        <h3>Великий вибір</h3>
                        <p>Понад 10,000 книг української та світової літератури</p>
                    </div>
                </div>

                {showMore && (
                    <div className="more-content">
                        <div className="benefits-grid">
                            <div className="benefit-card">
                                <span className="benefit-icon">⭐</span>
                                <h3>Якість гарантована</h3>
                                <p>Всі книги - оригінальні видання від перевірених видавництв</p>
                            </div>
                            <div className="benefit-card">
                                <span className="benefit-icon">🎁</span>
                                <h3>Бонуси та знижки</h3>
                                <p>Регулярні акції та спеціальні пропозиції для наших клієнтів</p>
                            </div>
                            <div className="benefit-card">
                                <span className="benefit-icon">🤝</span>
                                <h3>Підтримка 24/7</h3>
                                <p>Наша команда завжди готова допомогти з вибором книги</p>
                            </div>
                        </div>

                        <div className="testimonials-section">
                            <h3 className="testimonials-title">💬 Відгуки клієнтів</h3>
                            <div className="testimonials-grid">
                                <div className="testimonial-card">
                                    <p className="testimonial-text">
                                        "Чудовий магазин! Швидка доставка, якісні книги. 
                                        Замовляю тут постійно!"
                                    </p>
                                    <p className="testimonial-author">— Марія К.</p>
                                </div>
                                <div className="testimonial-card">
                                    <p className="testimonial-text">
                                        "Найкращий вибір української літератури. 
                                        Дуже задоволений обслуговуванням!"
                                    </p>
                                    <p className="testimonial-author">— Олександр П.</p>
                                </div>
                                <div className="testimonial-card">
                                    <p className="testimonial-text">
                                        "Знайшла тут рідкісні книги, яких не було в інших магазинах. 
                                        Рекомендую!"
                                    </p>
                                    <p className="testimonial-author">— Ірина В.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="view-more-container">
                    <button className="view-more-btn" onClick={toggleShowMore}>
                        {showMore ? '👆 Згорнути' : '👇 Дивитись більше'}
                    </button>
                </div>
            </section>
        </>
    );
};

export default Home;
