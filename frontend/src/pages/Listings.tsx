import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { ListedItem } from '../types/index';
import { useAuth } from '../context/AuthContext';

const ListingStatusBadge = ({ status }: { status: ListedItem['status'] }) => {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    sold: 'bg-purple-100 text-purple-800',
  };

  const statusIcons = {
    pending: <AlertCircle className="h-4 w-4" />,
    approved: <CheckCircle className="h-4 w-4" />,
    rejected: <XCircle className="h-4 w-4" />,
    sold: <Package className="h-4 w-4" />,
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${statusColors[status]}`}>
      {statusIcons[status]}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const Listings = () => {
  const [listings, setListings] = useState<ListedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Please login to view your listings');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5005/api/sell', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setListings(response.data.data || []);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch listings. Please try again later.');
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-700 mb-4">Please login to view your listings</p>
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
          <a 
            href="/sell" 
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700"
          >
            List New Item
          </a>
        </div>
        
        {listings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">You haven't listed any items yet.</p>
            <a href="/sell" className="mt-4 inline-block text-emerald-600 hover:text-emerald-700">
              Start Selling
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  {item.images[0] && (
                    <img
                      src={item.images[0]}
                      alt={item.type}
                      className="w-full h-48 object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-medium text-gray-900">{item.type}</h2>
                    <ListingStatusBadge status={item.status} />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-emerald-600">₹{item.price}</span>
                    <span className="text-sm text-gray-500">
                      Quantity: {item.count}
                    </span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Listed on {new Date(item.createdAt).toLocaleDateString()}
                    </p>
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

export default Listings;