import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase.</p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;