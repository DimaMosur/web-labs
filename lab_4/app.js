class Book {
    constructor(pages, author, price) {
        this.pages = parseInt(pages);
        this.author = author;
        this.price = parseFloat(price);
        this.id = Date.now() + Math.random();
    }
}

let books = [
    new Book(320, "Оксана Забужко", 250),
    new Book(150, "Сергій Жадан", 180),
    new Book(500, "Андрій Курков", 300),
    new Book(200, "Любко Дереш", 220),
];

// DOM Elements
const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");
const sortBtn = document.getElementById("sortBtn");
const totalBtn = document.getElementById("totalBtn");
const totalPrice = document.getElementById("totalPrice");
const createBtn = document.getElementById("createBtn");

// Modal Elements
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

// Modal Functions
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

    // Focus first input
    setTimeout(() => modalAuthorInput.focus(), 100);
}

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    bookForm.reset();
    editingBookId = null;
}

// Message Functions
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

// Book Functions
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

        // Edit button event
        bookDiv.querySelector(".editBtn").addEventListener("click", () => {
            openModal('edit', book);
        });

        // Delete button event
        bookDiv.querySelector(".deleteBtn").addEventListener("click", () => {
            if (confirm(`Ви впевнені, що хочете видалити книгу "${book.author}"?`)) {
                deleteBook(book.id);
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

function deleteBook(id) {
    const bookToDelete = books.find(book => book.id === id);
    books = books.filter(book => book.id !== id);
    renderBooks(books);
    updateTotalPrice();

    if (bookToDelete) {
        showMessage(`✅ Книгу "${bookToDelete.author}" видалено успішно!`, 'success');
    }
}

function addBook(author, pages, price) {
    const newBook = new Book(pages, author, price);
    books.push(newBook);
    renderBooks(books);
    updateTotalPrice();

    // Clear search if active
    if (searchInput.value) {
        searchInput.value = "";
    }

    showMessage(`✅ Книгу "${author}" додано успішно!`, 'success');
}

function editBook(id, author, pages, price) {
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
        books[bookIndex].author = author;
        books[bookIndex].pages = parseInt(pages);
        books[bookIndex].price = parseFloat(price);

        renderBooks(books);
        updateTotalPrice();

        showMessage(`✅ Книгу "${author}" оновлено успішно!`, 'success');
    }
}

function updateTotalPrice() {
    const total = books.reduce((sum, book) => sum + book.price, 0);
    totalPrice.textContent = `Загальна вартість: ${total.toFixed(2)}₴`;
}

// Event Listeners
createBtn.addEventListener("click", () => {
    openModal('create');
});

closeBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);

// Close modal when clicking outside
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
        closeModal();
    }
});

// Form submission
bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const author = modalAuthorInput.value.trim();
    const pages = parseInt(modalPagesInput.value);
    const price = parseFloat(modalPriceInput.value);

    // Validation
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

    if (editingBookId) {
        editBook(editingBookId, author, pages, price);
    } else {
        addBook(author, pages, price);
    }

    closeModal();
});

// Search functionality
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    const filtered = books.filter(book =>
        book.author.toLowerCase().includes(query)
    );
    renderBooks(filtered);
});

// Sort functionality
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

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
    renderBooks(books);
    updateTotalPrice();
});