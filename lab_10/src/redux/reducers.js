import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_QUANTITY,
    CLEAR_CART
} from './actions';

// Початковий стан кошика
const initialState = {
    items: [], // Масив книг в кошику
    totalItems: 0, // Загальна кількість товарів
    totalPrice: 0 // Загальна сума
};

/**
 * Обчислити загальні показники кошика
 * @param {Array} items - Масив товарів
 * @returns {Object} - Об'єкт з totalItems та totalPrice
 */
const calculateTotals = (items) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { totalItems, totalPrice };
};

/**
 * Cart Reducer
 * @param {Object} state - Поточний стан
 * @param {Object} action - Redux action
 * @returns {Object} - Новий стан
 */
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const book = action.payload;
            
            // Перевіряємо чи книга вже є в кошику
            const existingItemIndex = state.items.findIndex(item => item.id === book.id);
            
            let newItems;
            
            if (existingItemIndex >= 0) {
                // Якщо книга вже є - збільшуємо кількість
                newItems = state.items.map((item, index) => 
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Якщо книги немає - додаємо нову
                newItems = [...state.items, { ...book, quantity: 1 }];
            }
            
            const totals = calculateTotals(newItems);
            
            return {
                ...state,
                items: newItems,
                totalItems: totals.totalItems,
                totalPrice: totals.totalPrice
            };
        }
        
        case REMOVE_FROM_CART: {
            const bookId = action.payload;
            const newItems = state.items.filter(item => item.id !== bookId);
            const totals = calculateTotals(newItems);
            
            return {
                ...state,
                items: newItems,
                totalItems: totals.totalItems,
                totalPrice: totals.totalPrice
            };
        }
        
        case UPDATE_QUANTITY: {
            const { bookId, quantity } = action.payload;
            
            // Якщо кількість <= 0, видаляємо товар
            if (quantity <= 0) {
                const newItems = state.items.filter(item => item.id !== bookId);
                const totals = calculateTotals(newItems);
                
                return {
                    ...state,
                    items: newItems,
                    totalItems: totals.totalItems,
                    totalPrice: totals.totalPrice
                };
            }
            
            // Оновлюємо кількість
            const newItems = state.items.map(item =>
                item.id === bookId
                    ? { ...item, quantity: quantity }
                    : item
            );
            
            const totals = calculateTotals(newItems);
            
            return {
                ...state,
                items: newItems,
                totalItems: totals.totalItems,
                totalPrice: totals.totalPrice
            };
        }
        
        case CLEAR_CART: {
            return initialState;
        }
        
        default:
            return state;
    }
};

export default cartReducer;
