import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <Recycle className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">KidsCycle</span>
            </Link>
            <p className="mt-4 text-gray-300">
              Giving children's clothes and toys a second life while making a positive impact on our planet.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/how-it-works" className="text-gray-300 hover:text-white">How It Works</Link></li>
              <li><Link to="/sell" className="text-gray-300 hover:text-white">Sell Items</Link></li>
              <li><Link to="/shop" className="text-gray-300 hover:text-white">Shop</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/shop?category=clothing" className="text-gray-300 hover:text-white">Clothing</Link></li>
              <li><Link to="/shop?category=toys" className="text-gray-300 hover:text-white">Toys</Link></li>
              <li><Link to="/shop?category=books" className="text-gray-300 hover:text-white">Books</Link></li>
              <li><Link to="/shop?category=accessories" className="text-gray-300 hover:text-white">Accessories</Link></li>
              <li><Link to="/shop?category=shoes" className="text-gray-300 hover:text-white">Shoes</Link></li>
              <li><Link to="/shop?age=baby" className="text-gray-300 hover:text-white">Baby (0-2)</Link></li>
              <li><Link to="/shop?age=toddler" className="text-gray-300 hover:text-white">Toddler (2-4)</Link></li>
              <li><Link to="/shop?age=kids" className="text-gray-300 hover:text-white">Kids (4-12)</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-emerald-400" />
                <span className="text-gray-300">123 Green Street, Eco City, EC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-emerald-400" />
                <span className="text-gray-300">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-emerald-400" />
                <span className="text-gray-300">hello@kidscycle.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300">© 2025 KidsCycle. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;