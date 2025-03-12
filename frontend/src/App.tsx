import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import Order from './pages/Order';
import Listing from './pages/Listings';

function App() {
  const { user } = useAuth();
  const cart = useCart();

  // Debug logging
  console.log('Auth State:', {
    isAuthenticated: !!user,
    userId: user?.data?._id,
    userEmail: user?.data?.email,
    user: user
  });

  console.log('Cart State:', {
    itemCount: cart.items.length,
    totalAmount: cart.totalAmount,
    items: cart.items
  });

  return (
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
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/listings" element={<Listing />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;