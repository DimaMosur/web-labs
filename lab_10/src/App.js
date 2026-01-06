import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import BookDetails from './pages/BookDetails';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Header />
                    <Navigation />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route path="/book/:id" element={<BookDetails />} />
                            <Route path="/cart" element={<Cart />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </Provider>
    );
}

export default App;
