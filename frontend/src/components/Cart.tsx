import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag } from 'lucide-react';

export const Cart = () => {
  const navigate = useNavigate();
  const { items, totalAmount, removeFromCart, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/shop')}
            className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <div key={item.product._id} className="flex items-center border-b py-4">
              <img
                src={item.product.image || 'https://via.placeholder.com/150'}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="ml-4 flex-grow">
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-gray-500">${item.product.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <select
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.product._id, parseInt(e.target.value))}
                    className="border rounded-md mr-4"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeFromCart(item.product._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="font-medium">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="pt-2 mt-2 border-t flex justify-between font-bold">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md mt-6 hover:bg-emerald-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};