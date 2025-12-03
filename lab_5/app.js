const API_URL = 'http://localhost:5000/api/books';


class Book {
    constructor(pages, author, price, id = null) {
        this.pages = parseInt(pages);
        this.author = author;
        this.price = parseFloat(price);
        this.id = id || Date.now() + Math.random();
    }
}

let books = [];


const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");
const sortBtn = document.getElementById("sortBtn");
const totalBtn = document.getElementById("totalBtn");
const totalPrice = document.getElementById("totalPrice");
const createBtn = document.getElementById("createBtn");


const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const bookForm = document.getElementById("bookForm");
const modalAuthorInput = document.getElementById("modalAuthorInput");
const modalPagesInput = document.getElementById("modalPagesInput");
const modalPriceInput = document.getElementById("modalPriceInput");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const closeBtn = document.querySelector(".close");
const messageContainer = document.getElementById("messageContainer");

let sortAscending = true;
let editingBookId = null;

async function loadBooks() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP помилка! Статус: ${response.status}`);
        }

        books = await response.json();
        renderBooks(books);
        updateTotalPrice();
        showMessage("✅ Книги завантажено з сервера!", 'success');
    } catch (error) {
        console.error("Помилка завантаження книг:", error);
        showMessage("❌ Не вдалося завантажити книги з сервера. Перевірте, чи запущений Flask сервер!", 'error');
    }
}


async function createBookAPI(author, pages, price) {
    try {
        const newBook = new Book(pages, author, price);

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });

        if (!response.ok) {
            throw new Error(`HTTP помилка! Статус: ${response.status}`);
        }

        const savedBook = await response.json();
        books.push(savedBook);
        renderBooks(books);
        updateTotalPrice();


        if (searchInput.value) {
            searchInput.value = "";
        }

        showMessage(`✅ Книгу "${author}" додано успішно!`, 'success');
        return true;
    } catch (error) {
        console.error("Помилка створення книги:", error);
        showMessage("❌ Не вдалося створити книгу!", 'error');
        return false;
    }
}

async function updateBookAPI(id, author, pages, price) {
    try {
        const updatedBook = {
            author: author,
            pages: parseInt(pages),
            price: parseFloat(price)
        };

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        });

        if (!response.ok) {
            throw new Error(`HTTP помилка! Статус: ${response.status}`);
        }

        const savedBook = await response.json();

        const bookIndex = books.findIndex(book => book.id === id);
        if (bookIndex !== -1) {
            books[bookIndex] = savedBook;
        }

        renderBooks(books);
        updateTotalPrice();

        showMessage(`✅ Книгу "${author}" оновлено успішно!`, 'success');
        return true;
    } catch (error) {
        console.error("Помилка оновлення книги:", error);
        showMessage("❌ Не вдалося оновити книгу!", 'error');
        return false;
    }
}

async function deleteBookAPI(id) {
    try {
        const bookToDelete = books.find(book => book.id === id);

        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP помилка! Статус: ${response.status}`);
        }

        books = books.filter(book => book.id !== id);
        renderBooks(books);
        updateTotalPrice();

        if (bookToDelete) {
            showMessage(`✅ Книгу "${bookToDelete.author}" видалено успішно!`, 'success');
        }
        return true;
    } catch (error) {
        console.error("Помилка видалення книги:", error);
        showMessage("❌ Не вдалося видалити книгу!", 'error');
        return false;
    }
}

function openModal(mode = 'create', book = null) {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";

    if (mode === 'create') {
        modalTitle.textContent = "➕ Створити нову книгу";
        submitBtn.textContent = "Створити";
        submitBtn.className = "submit-btn";
        bookForm.reset();
        editingBookId = null;
    } else if (mode === 'edit' && book) {
        modalTitle.textContent = "✏️ Редагувати книгу";
        submitBtn.textContent = "Зберегти зміни";
        submitBtn.className = "submit-btn";
        modalAuthorInput.value = book.author;
        modalPagesInput.value = book.pages;
        modalPriceInput.value = book.price;
        editingBookId = book.id;
    }

    setTimeout(() => modalAuthorInput.focus(), 100);
}

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    bookForm.reset();
    editingBookId = null;
}


function showMessage(text, type = 'success') {
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;

    messageContainer.appendChild(message);

    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 4000);
}

// ==================== BOOK RENDERING ====================

function renderBooks(data) {
    bookList.innerHTML = "";

    if (data.length === 0) {
        bookList.innerHTML = '<div class="no-books">📚 Книги не знайдено</div>';
        return;
    }

    data.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.className = "book-item";
        bookDiv.innerHTML = `
            <div class="book-info">
                <strong>${escapeHtml(book.author)}</strong> — ${book.pages} сторінок — ${book.price.toFixed(2)}₴
            </div>
            <div class="book-actions">
                <button class="editBtn" title="Редагувати книгу">✏️ Редагувати</button>
                <button class="deleteBtn" title="Видалити книгу">🗑️</button>
            </div>
        `;

        bookDiv.querySelector(".editBtn").addEventListener("click", () => {
            openModal('edit', book);
        });

        bookDiv.querySelector(".deleteBtn").addEventListener("click", () => {
            if (confirm(`Ви впевнені, що хочете видалити книгу "${book.author}"?`)) {
                deleteBookAPI(book.id);
            }
        });

        bookList.appendChild(bookDiv);
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function updateTotalPrice() {
    const total = books.reduce((sum, book) => sum + book.price, 0);
    totalPrice.textContent = `Загальна вартість: ${total.toFixed(2)}₴`;
}


createBtn.addEventListener("click", () => {
    openModal('create');
});

closeBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
        closeModal();
    }
});

bookForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const author = modalAuthorInput.value.trim();
    const pages = parseInt(modalPagesInput.value);
    const price = parseFloat(modalPriceInput.value);

    if (!author) {
        showMessage("❌ Будь ласка, введіть ім'я автора!", 'error');
        modalAuthorInput.focus();
        return;
    }

    if (pages < 1) {
        showMessage("❌ Кількість сторінок має бути більше 0!", 'error');
        modalPagesInput.focus();
        return;
    }

    if (price < 0) {
        showMessage("❌ Ціна не може бути від'ємною!", 'error');
        modalPriceInput.focus();
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "⏳ Завантаження...";

    let success = false;

    if (editingBookId) {
        success = await updateBookAPI(editingBookId, author, pages, price);
    } else {
        success = await createBookAPI(author, pages, price);
    }

    submitBtn.disabled = false;
    submitBtn.textContent = editingBookId ? "Зберегти зміни" : "Створити";

    if (success) {
        closeModal();
    }
});

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    const filtered = books.filter(book =>
        book.author.toLowerCase().includes(query)
    );
    renderBooks(filtered);
});

sortBtn.addEventListener("click", () => {
    const sorted = [...books].sort((a, b) => {
        return sortAscending ? a.price - b.price : b.price - a.price;
    });

    sortAscending = !sortAscending;
    sortBtn.textContent = sortAscending ? "🔃 Сортувати за ціною ↑" : "🔃 Сортувати за ціною ↓";

    renderBooks(sorted);
});

// Total price button
totalBtn.addEventListener("click", () => {
    updateTotalPrice();
    showMessage("💰 Загальна вартість оновлена!", 'success');
});

// ==================== INITIALIZE APP ====================

document.addEventListener("DOMContentLoaded", () => {
    // Завантажуємо книги з сервера при старті
    loadBooks();
});