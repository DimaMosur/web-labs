import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FeaturedBooks from './components/FeaturedBooks';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <div className="App">
            <Header />
            <Navigation />
            <main className="main-content">
                <Hero />
                <FeaturedBooks />
            </main>
            <Footer />
        </div>
    );
}

export default App;