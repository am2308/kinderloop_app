import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, Share2, ArrowLeft, Star, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImage, setActiveImage] = useState(0);
  
  // This would normally come from an API call based on the ID
  const product = {
    id: parseInt(id || '1'),
    name: "Wooden Toy Set",
    category: "Toys",
    price: 24.99,
    originalPrice: 45.00,
    discount: 44,
    condition: "Excellent",
    age: "3-6 years",
    brand: "EcoToys",
    description: "This beautiful wooden toy set is perfect for imaginative play. Made from sustainable wood and finished with non-toxic paint, it's safe for children and the environment. The set includes 10 pieces that can be combined in various ways to create different structures.",
    features: [
      "Made from sustainable beechwood",
      "Non-toxic water-based paint",
      "10 versatile pieces",
      "Develops fine motor skills and creativity",
      "Suitable for ages 3-6 years"
    ],
    specifications: {
      "Material": "Beechwood",
      "Dimensions": "Box size: 8\" x 8\" x 4\"",
      "Weight": "1.2 lbs",
      "Age Range": "3-6 years",
      "Condition": "Excellent - minimal signs of use",
      "Original Retail Price": "$45.00"
    },
    images: [
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555448248-2571daf6344b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    reviews: [
      {
        id: 1,
        name: "Sarah J.",
        rating: 5,
        date: "2 months ago",
        comment: "My daughter loves this toy set! The quality is amazing, and you can't tell it's pre-loved. Highly recommend!"
      },
      {
        id: 2,
        name: "Michael R.",
        rating: 4,
        date: "3 months ago",
        comment: "Great quality and value. There were a few minor scratches, but nothing that affects play. My son plays with it every day."
      },
      {
        id: 3,
        name: "Emily C.",
        rating: 5,
        date: "1 month ago",
        comment: "Beautiful wooden toys that will last for years. So glad I found this instead of buying new plastic toys. The refurbishing is top-notch!"
      }
    ],
    relatedProducts: [
      {
        id: 5,
        name: "Building Blocks Set",
        price: 19.99,
        originalPrice: 34.99,
        image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Toys"
      },
      {
        id: 8,
        name: "Educational Puzzle Set",
        price: 14.99,
        originalPrice: 29.99,
        image: "https://images.unsplash.com/photo-1576334682266-316a4c0aed17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Toys"
      },
      {
        id: 10,
        name: "Baby Activity Gym",
        price: 29.99,
        originalPrice: 59.99,
        image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Toys"
      }
    ]
  };
  
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

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
          {/* Product Images */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <div className="mb-4 overflow-hidden rounded-lg">
              <img 
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`cursor-pointer rounded-md overflow-hidden border-2 ${activeImage === index ? 'border-emerald-500' : 'border-transparent'}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - View ${index + 1}`} 
                    className="w-full h-20 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="lg:w-1/2">
            <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex">
                {renderStars(4.7)}
              </div>
              <span className="text-sm text-gray-500 ml-2">
                Based on {product.reviews.length} reviews
              </span>
            </div>
            
            <div className="mb-4">
              <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              <span className="ml-2 text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              <span className="ml-2 text-sm font-semibold text-red-600">
                {product.discount}% OFF
              </span>
            </div>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="text-sm text-gray-700">
                <span className="font-medium">Condition:</span> {product.condition}
              </div>
              <div className="text-sm text-gray-700">
                <span className="font-medium">Age Range:</span> {product.age}
              </div>
              <div className="text-sm text-gray-700">
                <span className="font-medium">Brand:</span> {product.brand}
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">
              {product.description}
            </p>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    onClick={decrementQuantity}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x border-gray-300">{quantity}</span>
                  <button 
                    onClick={incrementQuantity}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <div className="ml-4">
                  <span className="text-sm text-gray-500">Only 3 left in stock</span>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
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
              <div className="flex items-center text-sm text-gray-600">
                <RefreshCw className="h-5 w-5 text-emerald-600 mr-2" />
                <span>Thoroughly inspected and refurbished</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'description'
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'specifications'
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews ({product.reviews.length})
              </button>
            </nav>
          </div>
          
          <div className="py-6">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
                <h3 className="font-semibold mb-2">Key Features:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div className="border rounded-md overflow-hidden">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <div 
                    key={key} 
                    className={`flex ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <div className="w-1/3 px-4 py-3 font-medium text-gray-700">{key}</div>
                    <div className="w-2/3 px-4 py-3 text-gray-600">{value}</div>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {renderStars(4.7)}
                    </div>
                    <span className="ml-2 text-gray-700 font-medium">4.7 out of 5</span>
                  </div>
                  <p className="text-gray-600">Based on {product.reviews.length} reviews</p>
                </div>
                
                <div className="space-y-6">
                  {product.reviews.map(review => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex justify-between mb-2">
                        <div>
                          <span className="font-medium text-gray-800">{review.name}</span>
                          <div className="flex text-yellow-400 mt-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600 mt-2">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.relatedProducts.map(relatedProduct => (
              <div key={relatedProduct.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                    {relatedProduct.category}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold">{relatedProduct.name}</h3>
                  <div className="mt-1 flex items-center">
                    <span className="text-gray-900 font-medium">${relatedProduct.price.toFixed(2)}</span>
                    <span className="ml-2 text-sm text-gray-500 line-through">${relatedProduct.originalPrice.toFixed(2)}</span>
                  </div>
                  <div className="mt-3">
                    <Link 
                      to={`/product/${relatedProduct.id}`} 
                      className="block w-full bg-emerald-600 text-white text-center py-2 rounded-md hover:bg-emerald-700 transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;