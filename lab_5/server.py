from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = 'books.json'

def read_books():
    if not os.path.exists(DATA_FILE):
        return []
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except json.JSONDecodeError:
        return []

def write_books(books):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(books, f, ensure_ascii=False, indent=2)

# REST API Endpoints

@app.route('/')
def home():
    return jsonify({
        "message": "📚 Book Collection API",
        "endpoints": {
            "GET /api/books": "Отримати всі книги",
            "GET /api/books/<id>": "Отримати книгу за ID",
            "POST /api/books": "Створити нову книгу",
            "PUT /api/books/<id>": "Оновити книгу",
            "DELETE /api/books/<id>": "Видалити книгу"
        }
    })

@app.route('/api/books', methods=['GET'])
def get_books():
    books = read_books()
    return jsonify(books), 200

@app.route('/api/books/<float:book_id>', methods=['GET'])
def get_book(book_id):
    books = read_books()
    book = next((b for b in books if b['id'] == book_id), None)

    if book:
        return jsonify(book), 200
    else:
        return jsonify({"error": "Книгу не знайдено"}), 404

@app.route('/api/books', methods=['POST'])
def create_book():
    data = request.get_json()

    if not data or 'author' not in data or 'pages' not in data or 'price' not in data:
        return jsonify({"error": "Необхідно вказати author, pages та price"}), 400

    books = read_books()

    new_book = {
        "id": data.get('id'),
        "author": data['author'],
        "pages": int(data['pages']),
        "price": float(data['price'])
    }

    books.append(new_book)
    write_books(books)

    return jsonify(new_book), 201

@app.route('/api/books/<float:book_id>', methods=['PUT'])
def update_book(book_id):
    data = request.get_json()
    books = read_books()

    book_index = next((i for i, b in enumerate(books) if b['id'] == book_id), None)

    if book_index is None:
        return jsonify({"error": "Книгу не знайдено"}), 404

    books[book_index]['author'] = data.get('author', books[book_index]['author'])
    books[book_index]['pages'] = int(data.get('pages', books[book_index]['pages']))
    books[book_index]['price'] = float(data.get('price', books[book_index]['price']))

    write_books(books)

    return jsonify(books[book_index]), 200

@app.route('/api/books/<float:book_id>', methods=['DELETE'])
def delete_book(book_id):
    books = read_books()

    updated_books = [b for b in books if b['id'] != book_id]

    if len(updated_books) == len(books):
        return jsonify({"error": "Книгу не знайдено"}), 404

    write_books(updated_books)

    return jsonify({"message": "Книгу видалено успішно"}), 200

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint не знайдено"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Внутрішня помилка сервера"}), 500

if __name__ == '__main__':
    if not os.path.exists(DATA_FILE):
        initial_books = [
            {"id": 1701234567890.123, "pages": 320, "author": "Оксана Забужко", "price": 250},
            {"id": 1701234567891.456, "pages": 150, "author": "Сергій Жадан", "price": 180},
            {"id": 1701234567892.789, "pages": 500, "author": "Андрій Курков", "price": 300},
            {"id": 1701234567893.012, "pages": 200, "author": "Любко Дереш", "price": 220}
        ]
        write_books(initial_books)

    print("🚀 Flask сервер запущено на http://localhost:5000")
    print("📚 API доступне за адресою: http://localhost:5000/api/books")
    app.run(debug=True, port=5000)