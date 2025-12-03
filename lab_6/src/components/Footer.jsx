import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Про магазин</h4>
                    <p>Найкращі українські та світові книги</p>
                </div>
                <div className="footer-section">
                    <h4>Контакти</h4>
                    <p>📧 info@bookstore.ua</p>
                    <p>📞 +380 XX XXX XXXX</p>
                </div>
                <div className="footer-section">
                    <h4>Слідкуйте за нами</h4>
                    <p>📱 Facebook | Instagram | Twitter</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2025 BookStore. Всі права захищені.</p>
            </div>
        </footer>
    );
};

export default Footer;