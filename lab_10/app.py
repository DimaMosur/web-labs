from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Дозволяє запити з React фронтенду

# База даних книг (у реальному проекті це була б БД)
books_db = [
    {
        'id': 1,
        'author': 'Оксана Забужко',
        'pages': 320,
        'price': 250,
        'description': 'Культова книга про складність жіночої ідентичності в пострадянському просторі. Філософський роман, що поєднує особисту історію з роздумами про українську культуру та історію.'
    },
    {
        'id': 2,
        'author': 'Сергій Жадан',
        'pages': 150,
        'price': 180,
        'description': 'Пронизлива поезія про сучасну Україну, війну та людяність. Тексти, що торкаються найглибших струн душі та змушують переосмислити цінності.'
    },
    {
        'id': 3,
        'author': 'Андрій Курков',
        'pages': 500,
        'price': 300,
        'description': 'Детективний роман з елементами абсурду та чорного гумору. Захоплива історія, що розгортається на тлі пострадянської реальності з несподіваними поворотами сюжету.'
    },
    {
        'id': 4,
        'author': 'Ліна Костенко',
        'pages': 280,
        'price': 220,
        'description': 'Історичний роман у віршах про кохання та драматичні події української історії. Поетична майстерність поєднана з глибоким філософським змістом.'
    },
    {
        'id': 5,
        'author': 'Іван Франко',
        'pages': 450,
        'price': 290,
        'description': 'Класика української літератури. Збірка найкращих творів великого Каменяра - від соціальної прози до ліричної поезії, що залишається актуальною донині.'
    },
    {
        'id': 6,
        'author': 'Тарас Шевченко',
        'pages': 380,
        'price': 260,
        'description': 'Кобзар - найвідоміша збірка української поезії всіх часів. Твори про волю, кохання, справедливість та українську долю, що стали символом нації.'
    },
    {
        'id': 7,
        'author': 'Леся Українка',
        'pages': 340,
        'price': 240,
        'description': 'Драматичні поеми та вірші видатної української письменниці. Твори про силу духу, боротьбу за свободу та непохитність перед життєвими випробуваннями.'
    },
    {
        'id': 8,
        'author': 'Григорій Сковорода',
        'pages': 200,
        'price': 190,
        'description': 'Філософські твори українського мислителя XVIII століття. Мудрі роздуми про щастя, пізнання себе та гармонію з навколишнім світом.'
    },
    {
        'id': 9,
        'author': 'Панас Мирний',
        'pages': 520,
        'price': 310,
        'description': 'Епічний соціально-психологічний роман про життя українського селянства. Потужна реалістична проза, що розкриває складні суспільні процеси XIX століття.'
    },
    {
        'id': 10,
        'author': 'Михайло Коцюбинський',
        'pages': 270,
        'price': 210,
        'description': 'Імпресіоністична проза про красу природи та складність людської психології. Новели, що вражають своєю поетичністю та глибиною.'
    },
    {
        'id': 11,
        'author': 'Василь Стус',
        'pages': 310,
        'price': 230,
        'description': 'Поезія нескореного. Твори поета-дисидента про свободу, гідність та незламність духу. Вірші, написані в ув\'язненні, що стали символом опору.'
    },
    {
        'id': 12,
        'author': 'Ольга Кобилянська',
        'pages': 360,
        'price': 250,
        'description': 'Новели та повісті про жіночу емансипацію та пошук себе. Психологічна проза, що порушує важливі соціальні та особистісні теми.'
    },
]


# GET - Отримати популярні книги (перші 3)
@app.route('/api/books/featured', methods=['GET'])
def get_featured_books():
    # Беремо перші 3 книги як популярні
    featured = books_db[:3]

    # Імітація затримки
    import time
    time.sleep(0.5)

    return jsonify({
        'success': True,
        'count': len(featured),
        'books': featured
    })


# GET - Отримати всі книги або з фільтрами
@app.route('/api/books', methods=['GET'])
def get_books():
    # Отримуємо параметри фільтрації з URL
    price_filter = request.args.get('price', 'all')
    pages_filter = request.args.get('pages', 'all')
    search_query = request.args.get('search', '').lower()

    # Копіюємо базу книг для фільтрації
    filtered_books = books_db.copy()

    # Фільтр по ціні
    if price_filter == 'low':
        filtered_books = [b for b in filtered_books if b['price'] < 200]
    elif price_filter == 'medium':
        filtered_books = [b for b in filtered_books if 200 <= b['price'] <= 280]
    elif price_filter == 'high':
        filtered_books = [b for b in filtered_books if b['price'] > 280]

    # Фільтр по сторінках
    if pages_filter == 'short':
        filtered_books = [b for b in filtered_books if b['pages'] < 250]
    elif pages_filter == 'medium':
        filtered_books = [b for b in filtered_books if 250 <= b['pages'] <= 400]
    elif pages_filter == 'long':
        filtered_books = [b for b in filtered_books if b['pages'] > 400]

    # Пошук по тексту
    if search_query:
        filtered_books = [
            b for b in filtered_books
            if search_query in b['author'].lower() or search_query in b['description'].lower()
        ]

    # Імітація затримки мережі (для демонстрації spinner)
    import time
    time.sleep(1)  # 1 секунда затримки

    return jsonify({
        'success': True,
        'count': len(filtered_books),
        'books': filtered_books
    })


# GET - Отримати книгу за ID
@app.route('/api/books/<int:book_id>', methods=['GET'])
def get_book(book_id):
    book = next((b for b in books_db if b['id'] == book_id), None)

    if book:
        # Імітація затримки
        import time
        time.sleep(0.5)

        return jsonify({
            'success': True,
            'book': book
        })
    else:
        return jsonify({
            'success': False,
            'message': 'Книгу не знайдено'
        }), 404


# POST - Додати нову книгу (опціонально)
@app.route('/api/books', methods=['POST'])
def add_book():
    data = request.get_json()

    # Генеруємо новий ID
    new_id = max([b['id'] for b in books_db]) + 1

    new_book = {
        'id': new_id,
        'author': data.get('author'),
        'pages': data.get('pages'),
        'price': data.get('price'),
        'description': data.get('description')
    }

    books_db.append(new_book)

    return jsonify({
        'success': True,
        'book': new_book
    }), 201


# PUT - Оновити книгу (опціонально)
@app.route('/api/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    book = next((b for b in books_db if b['id'] == book_id), None)

    if not book:
        return jsonify({
            'success': False,
            'message': 'Книгу не знайдено'
        }), 404

    data = request.get_json()
    book.update({
        'author': data.get('author', book['author']),
        'pages': data.get('pages', book['pages']),
        'price': data.get('price', book['price']),
        'description': data.get('description', book['description'])
    })

    return jsonify({
        'success': True,
        'book': book
    })


# DELETE - Видалити книгу (опціонально)
@app.route('/api/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    global books_db
    book = next((b for b in books_db if b['id'] == book_id), None)

    if not book:
        return jsonify({
            'success': False,
            'message': 'Книгу не знайдено'
        }), 404

    books_db = [b for b in books_db if b['id'] != book_id]

    return jsonify({
        'success': True,
        'message': 'Книгу видалено'
    })


# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'BookStore API is running'
    })


if __name__ == '__main__':
    print("🚀 Flask server запущено на http://localhost:5000")
    print("📚 API endpoints:")
    print("   GET    /api/books - отримати всі книги")
    print("   GET    /api/books?price=low&pages=short&search=текст - з фільтрами")
    print("   GET    /api/books/<id> - отримати книгу за ID")
    print("   POST   /api/books - додати книгу")
    print("   PUT    /api/books/<id> - оновити книгу")
    print("   DELETE /api/books/<id> - видалити книгу")
    print("   GET    /api/health - перевірка здоров'я")

    app.run(debug=True, port=5000)