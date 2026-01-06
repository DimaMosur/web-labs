import { createStore } from 'redux';
import cartReducer from './reducers';

// Middleware для логування (опціонально, для дебагу)
const logger = (store) => (next) => (action) => {
    console.log('🔵 Redux Action:', action.type);
    console.log('📦 Payload:', action.payload);
    console.log('📊 Previous State:', store.getState());
    
    const result = next(action);
    
    console.log('📊 New State:', store.getState());
    console.log('---');
    
    return result;
};

// Створюємо Redux store
const store = createStore(
    cartReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Redux DevTools
);

export default store;
