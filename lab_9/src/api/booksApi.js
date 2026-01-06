import axios from 'axios';

// Базовий URL для API
const API_BASE_URL = 'http://localhost:5000/api';

// Створюємо інстанс axios з базовими налаштуваннями
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 секунд таймаут
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor для логування запитів (опціонально)
apiClient.interceptors.request.use(
    (config) => {
        console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor для логування відповідей (опціонально)
apiClient.interceptors.response.use(
    (response) => {
        console.log(`📥 API Response: ${response.status} ${response.config.url}`);
        return response;
    },
    (error) => {
        console.error('❌ API Error:', error.message);
        return Promise.reject(error);
    }
);

// ==================== BOOKS API ====================

/**
 * Отримати популярні книги (featured)
 * @returns {Promise} - Проміс з масивом популярних книг
 */
export const getFeaturedBooks = async () => {
    try {
        const response = await apiClient.get('/books/featured');
        return response.data;
    } catch (error) {
        console.error('Error fetching featured books:', error);
        // Якщо немає окремого endpoint, використовуємо всі книги
        const allBooks = await getAllBooks();
        return {
            success: allBooks.success,
            count: 3,
            books: allBooks.books.slice(0, 3)
        };
    }
};

/**
 * Отримати всі книги або з фільтрами
 * @param {Object} filters - Об'єкт з фільтрами { price, pages, search }
 * @returns {Promise} - Проміс з масивом книг
 */
export const getAllBooks = async (filters = {}) => {
    try {
        // Формуємо параметри запиту
        const params = {};

        if (filters.price && filters.price !== 'all') {
            params.price = filters.price;
        }

        if (filters.pages && filters.pages !== 'all') {
            params.pages = filters.pages;
        }

        if (filters.search && filters.search.trim()) {
            params.search = filters.search.trim();
        }

        const response = await apiClient.get('/books', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

/**
 * Отримати книгу за ID
 * @param {number} bookId - ID книги
 * @returns {Promise} - Проміс з об'єктом книги
 */
export const getBookById = async (bookId) => {
    try {
        const response = await apiClient.get(`/books/${bookId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching book ${bookId}:`, error);
        throw error;
    }
};

/**
 * Додати нову книгу
 * @param {Object} bookData - Дані книги
 * @returns {Promise} - Проміс з новою книгою
 */
export const addBook = async (bookData) => {
    try {
        const response = await apiClient.post('/books', bookData);
        return response.data;
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
};

/**
 * Оновити книгу
 * @param {number} bookId - ID книги
 * @param {Object} bookData - Оновлені дані
 * @returns {Promise} - Проміс з оновленою книгою
 */
export const updateBook = async (bookId, bookData) => {
    try {
        const response = await apiClient.put(`/books/${bookId}`, bookData);
        return response.data;
    } catch (error) {
        console.error(`Error updating book ${bookId}:`, error);
        throw error;
    }
};

/**
 * Видалити книгу
 * @param {number} bookId - ID книги
 * @returns {Promise} - Проміс з результатом
 */
export const deleteBook = async (bookId) => {
    try {
        const response = await apiClient.delete(`/books/${bookId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting book ${bookId}:`, error);
        throw error;
    }
};

/**
 * Перевірка здоров'я API
 * @returns {Promise} - Проміс зі статусом
 */
export const checkHealth = async () => {
    try {
        const response = await apiClient.get('/health');
        return response.data;
    } catch (error) {
        console.error('Error checking API health:', error);
        throw error;
    }
};

// Експортуємо також інстанс axios для кастомних запитів
export default apiClient;