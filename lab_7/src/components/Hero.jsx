import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h2 className="hero-title">Знайди свою наступну улюблену книгу</h2>
                <p className="hero-subtitle">
                    Відкрийте для себе найкращі українські та світові бестселери
                </p>
                <Link to="/catalog">
                    <button className="hero-btn">Дивитись каталог →</button>
                </Link>
            </div>
        </section>
    );
};

export default Hero;
