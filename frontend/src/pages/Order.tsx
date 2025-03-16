import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import { Package, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import { Order } from '../types/order';
import { useAuth } from '../context/AuthContext';

const OrderStatusIcon = ({ status }: { status: Order['status'] }) => {
  switch (status) {
    case 'pending':
      return <AlertCircle className="h-6 w-6 text-yellow-500" />;
    case 'processing':
      return <Package className="h-6 w-6 text-blue-500" />;
    case 'shipped':
      return <Truck className="h-6 w-6 text-purple-500" />;
    case 'delivered':
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    default:
      return <AlertCircle className="h-6 w-6 text-red-500" />;
  }
};

const OrderStatusBadge = ({ status }: { status: Order['status'] }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Please login to view your orders');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5004/api/orders/myorders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Update this line to access the orders from the data property
        setOrders(response.data.data || []);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch orders. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-700 mb-4">Please login to view your orders</p>
          <a 
            href="/login" 
            className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700"
          >
            Login
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">You haven't placed any orders yet.</p>
            <a href="/shop" className="mt-4 inline-block text-emerald-600 hover:text-emerald-700">
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Order placed</p>
                      <p className="font-medium">
                        {format(new Date(order.createdAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <OrderStatusBadge status={order.status} />
                  </div>

                  <div className="border-t border-gray-200 -mx-6 px-6 py-4">
                    {order.items.map((item) => (
                      <div key={item._id} className="flex items-center py-4 border-b border-gray-100 last:border-0">
                        {item.product.images && item.product.images[0] && (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="h-20 w-20 object-cover rounded-md"
                          />
                        )}
                        <div className="ml-4 flex-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.product.name}
                          </h3>
                          <p className="text-gray-500">Quantity: {item.quantity}</p>
                          <p className="text-gray-900 font-medium">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping Address:</span>
                      <span className="text-gray-900">
                        {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
                        {order.shippingAddress.state} {order.shippingAddress.zipCode},{' '}
                        {order.shippingAddress.country}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="text-gray-900">{order.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                      <span className="text-lg font-medium text-gray-900">Total Amount:</span>
                      <span className="text-xl font-bold text-emerald-600">
                        ${order.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;