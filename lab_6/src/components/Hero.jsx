import React from 'react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h2 className="hero-title">Знайди свою наступну улюблену книгу</h2>
                <p className="hero-subtitle">
                    Відкрийте для себе найкращі українські та світові бестселери
                </p>
                <button className="hero-btn">Дивитись каталог →</button>
            </div>
        </section>
    );
};

export default Hero;