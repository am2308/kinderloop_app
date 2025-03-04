import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Recycle, ShoppingBag, Menu, X, Search } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-emerald-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Recycle className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">KidsCycle</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-700">
                Home
              </Link>
              <Link to="/how-it-works" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-700">
                How It Works
              </Link>
              <Link to="/sell" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-700">
                Sell Items
              </Link>
              <Link to="/shop" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-700">
                Shop
              </Link>
              <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-700">
                About Us
              </Link>
              <Link to="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-emerald-700">
                Contact
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center">
            <div className="relative mx-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-emerald-300" />
              </div>
              <input
                className="bg-emerald-700 block w-full pl-10 pr-3 py-2 rounded-md text-sm placeholder-emerald-300"
                type="text"
                placeholder="Search products..."
              />
            </div>
            <Link to="/shop/cart" className="ml-4 p-2 rounded-full hover:bg-emerald-700">
              <ShoppingBag className="h-6 w-6" />
            </Link>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-emerald-700 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/how-it-works" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/sell" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Sell Items
            </Link>
            <Link 
              to="/shop" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="relative mt-3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-emerald-300" />
              </div>
              <input
                className="bg-emerald-700 block w-full pl-10 pr-3 py-2 rounded-md text-sm placeholder-emerald-300"
                type="text"
                placeholder="Search products..."
              />
            </div>
            <Link 
              to="/shop/cart" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Cart
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;