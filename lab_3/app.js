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

const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");
const sortBtn = document.getElementById("sortBtn");
const totalBtn = document.getElementById("totalBtn");
const totalPrice = document.getElementById("totalPrice");

const addBookForm = document.getElementById("addBookForm");
const authorInput = document.getElementById("authorInput");
const pagesInput = document.getElementById("pagesInput");
const priceInput = document.getElementById("priceInput");

let sortAscending = true;

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
            <button class="deleteBtn" title="Видалити книгу">🗑️</button>
        `;

        bookDiv.querySelector(".deleteBtn").addEventListener("click", () => {
                deleteBook(book.id);
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
    books = books.filter(book => book.id !== id);
    renderBooks(books);
    updateTotalPrice(); // Update total after deletion
}

function updateTotalPrice() {
    const total = books.reduce((sum, book) => sum + book.price, 0);
    totalPrice.textContent = `Загальна вартість: ${total.toFixed(2)}₴`;
}

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

totalBtn.addEventListener("click", () => {
    updateTotalPrice();
});

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const author = authorInput.value.trim();
    const pages = parseInt(pagesInput.value);
    const price = parseFloat(priceInput.value);
    const newBook = new Book(pages, author, price);
    books.push(newBook);

    addBookForm.reset();
    renderBooks(books);

    if (searchInput.value) {
        searchInput.value = "";
    }

    const successMsg = document.createElement("div");
    successMsg.className = "success-message";
    successMsg.textContent = `✅ Книгу "${author}" додано успішно!`;
    addBookForm.appendChild(successMsg);

    setTimeout(() => {
        if (successMsg.parentNode) {
            successMsg.remove();
        }
    }, 3000);
    updateTotalPrice()
});

document.addEventListener("DOMContentLoaded", () => {
    renderBooks(books);
    updateTotalPrice();
});