import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Aboutpage from './pages/AboutPage';
import HowItWorks from './pages/HowItWorks';
import SellItems from './pages/SellItems';
import ShopPage from './pages/ShopPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ContactPage from './pages/ContactPage';
import ProductDetail from './pages/ProductDetail';
import { Cart } from './components/Cart';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/sell" element={<SellItems />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/about" element={<Aboutpage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;