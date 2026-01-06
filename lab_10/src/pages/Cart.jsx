import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../redux/actions';
import './Cart.css';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Отримуємо дані з Redux store використовуючи useSelector
    const cartItems = useSelector(state => state.items);
    const totalItems = useSelector(state => state.totalItems);
    const totalPrice = useSelector(state => state.totalPrice);

    // Збільшити кількість
    const handleIncreaseQuantity = (bookId, currentQuantity) => {
        dispatch(updateQuantity(bookId, currentQuantity + 1));
    };

    // Зменшити кількість
    const handleDecreaseQuantity = (bookId, currentQuantity) => {
        if (currentQuantity > 1) {
            dispatch(updateQuantity(bookId, currentQuantity - 1));
        }
    };

    // Видалити з кошика
    const handleRemove = (bookId) => {
        dispatch(removeFromCart(bookId));
    };

    // Очистити весь кошик
    const handleClearCart = () => {
        if (window.confirm('Ви впевнені що хочете очистити кошик?')) {
            dispatch(clearCart());
        }
    };

    // Якщо кошик порожній
    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <h1 className="cart-title">🛒 Кошик</h1>
                <div className="empty-cart">
                    <div className="empty-cart-icon">🛒</div>
                    <h2>Ваш кошик порожній</h2>
                    <p>Додайте книги до кошика, щоб продовжити покупки</p>
                    <button 
                        className="continue-shopping-btn"
                        onClick={() => navigate('/catalog')}
                    >
                        Перейти до каталогу →
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-header">
                <h1 className="cart-title">🛒 Кошик</h1>
                <button className="clear-cart-btn" onClick={handleClearCart}>
                    🗑️ Очистити кошик
                </button>
            </div>

            <div className="cart-content">
                {/* Список товарів */}
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-item-icon">📕</div>
                            
                            <div className="cart-item-info">
                                <h3 className="cart-item-author">{item.author}</h3>
                                <p className="cart-item-pages">{item.pages} сторінок</p>
                                <button 
                                    className="cart-item-details"
                                    onClick={() => navigate(`/book/${item.id}`)}
                                >
                                    Детальніше →
                                </button>
                            </div>

                            <div className="cart-item-quantity">
                                <button 
                                    className="quantity-btn"
                                    onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
                                    disabled={item.quantity <= 1}
                                >
                                    −
                                </button>
                                <span className="quantity-value">{item.quantity}</span>
                                <button 
                                    className="quantity-btn"
                                    onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
                                >
                                    +
                                </button>
                            </div>

                            <div className="cart-item-price">
                                <span className="item-price">{item.price.toFixed(2)} ₴</span>
                                <span className="item-total">
                                    Всього: {(item.price * item.quantity).toFixed(2)} ₴
                                </span>
                            </div>

                            <button 
                                className="remove-btn"
                                onClick={() => handleRemove(item.id)}
                                title="Видалити з кошика"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                {/* Підсумок */}
                <div className="cart-summary">
                    <h2 className="summary-title">Підсумок замовлення</h2>
                    
                    <div className="summary-row">
                        <span>Товарів:</span>
                        <span className="summary-value">{totalItems}</span>
                    </div>

                    <div className="summary-row">
                        <span>Сума:</span>
                        <span className="summary-value">{totalPrice.toFixed(2)} ₴</span>
                    </div>

                    <div className="summary-row summary-total">
                        <span>Разом до сплати:</span>
                        <span className="summary-price">{totalPrice.toFixed(2)} ₴</span>
                    </div>

                    <button className="checkout-btn">
                        Оформити замовлення →
                    </button>

                    <button 
                        className="continue-shopping-btn-small"
                        onClick={() => navigate('/catalog')}
                    >
                        ← Продовжити покупки
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
