// Redux actions для кошика

// Action types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

/**
 * Додати книгу в кошик
 * @param {Object} book - Об'єкт книги
 * @returns {Object} - Redux action
 */
export const addToCart = (book) => {
    return {
        type: ADD_TO_CART,
        payload: book
    };
};

/**
 * Видалити книгу з кошика
 * @param {number} bookId - ID книги
 * @returns {Object} - Redux action
 */
export const removeFromCart = (bookId) => {
    return {
        type: REMOVE_FROM_CART,
        payload: bookId
    };
};

/**
 * Оновити кількість книги в кошику
 * @param {number} bookId - ID книги
 * @param {number} quantity - Нова кількість
 * @returns {Object} - Redux action
 */
export const updateQuantity = (bookId, quantity) => {
    return {
        type: UPDATE_QUANTITY,
        payload: { bookId, quantity }
    };
};

/**
 * Очистити весь кошик
 * @returns {Object} - Redux action
 */
export const clearCart = () => {
    return {
        type: CLEAR_CART
    };
};
