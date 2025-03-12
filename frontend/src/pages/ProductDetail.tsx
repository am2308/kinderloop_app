import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, Share2, ArrowLeft, Truck, ShieldCheck, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProduct } from '../services/api';
import { Product } from '../types/index';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        if (id) {
          const response = await getProduct(id);
          // Handle the data structure from the API response
          if (response.data) {
            setProduct({
              ...response.data,
              image: response.data.images ? response.data.images[0] : null,
              stock: response.data.stock || 0,
              category: response.data.category || 'Uncategorized'
            });
          } else {
            setError('Product data not found');
          }
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  
  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert('Product added to cart!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/shop" className="flex items-center text-emerald-600 hover:text-emerald-700">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Shop
          </Link>
        </div>
        
        {/* Product Details */}
        <div className="lg:flex gap-12 mb-16">
          {/* Product Image */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <div className="mb-4 overflow-hidden rounded-lg">
              <img 
                src={product.image || 'https://via.placeholder.com/400'} 
                alt={product.name} 
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="mb-2">
              <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="mb-4">
              <span className="text-2xl font-bold text-gray-900">${Number(product.price).toFixed(2)}</span>
            </div>
            
            <p className="text-gray-600 mb-6">
              {product.description}
            </p>
            
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    onClick={decrementQuantity}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    disabled={product.stock <= quantity}
                  >
                    +
                  </button>
                </div>
                <div className="ml-4">
                  <span className="text-sm text-gray-500">
                    {product.stock} items left in stock
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={product.stock === 0}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Truck className="h-5 w-5 text-emerald-600 mr-2" />
                <span>Free shipping on orders over $35</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <ShieldCheck className="h-5 w-5 text-emerald-600 mr-2" />
                <span>30-day satisfaction guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;