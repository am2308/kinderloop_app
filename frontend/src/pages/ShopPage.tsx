import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ChevronDown, Search, X } from 'lucide-react';

const ShopPage = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };
  
  const clearFilters = () => {
    setActiveFilters([]);
  };

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Wooden Toy Set",
      category: "Toys",
      price: 24.99,
      originalPrice: 45.00,
      image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      age: "3-6 years",
      condition: "Excellent"
    },
    {
      id: 2,
      name: "Kids Winter Outfit",
      category: "Clothing",
      price: 18.99,
      originalPrice: 35.00,
      image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      age: "4-5 years",
      condition: "Like New"
    },
    {
      id: 3,
      name: "Children's Book Collection",
      category: "Books",
      price: 12.99,
      originalPrice: 28.00,
      image: "https://images.unsplash.com/photo-1584661156681-540e80a162b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      age: "2-8 years",
      condition: "Good"
    },
    {
      id: 4,
      name: "Refurbished Stroller",
      category: "Gear",
      price: 89.99,
      originalPrice: 180.00,
      image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      age: "0-3 years",
      condition: "Excellent"
    },
    {
      id: 5,
      name: "Building Blocks Set",
      category: "Toys",
      price: 19.99,
      originalPrice: 34.99,
      image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      age: "1-5 years",
      condition: "Like New"
    },
    {
      id: 6,
      name: "Baby Clothes Bundle",
      category: "Clothing",
      price: 22.99,
      originalPrice: 45.00,
      image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      age: "0-12 months",
      condition: "Good"
    },
    {
      id: 7,
      name: "Kids Bicycle",
      category: "Gear",
      price: 65.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1532330393533-443990f44e05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      age: "4-8 years",
      condition: "Good"
    },
    {
      id: 8,
      name: "Educational Puzzle Set",
      category: "Toys",
      price: 14.99,
      originalPrice: 29.99,
      image: "https://images.unsplash.com/photo-1576334682266-316a4c0aed17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      age: "3-7 years",
      condition: "Excellent"
    },
    {
      id: 9,
      name: "Children's Shoes",
      category: "Shoes",
      price: 16.99,
      originalPrice: 32.00,
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      age: "2-3 years",
      condition: "Like New"
    },
    {
      id: 10,
      name: "Baby Activity Gym",
      category: "Toys",
      price: 29.99,
      originalPrice: 59.99,
      image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      age: "0-12 months",
      condition: "Excellent"
    },
    {
      id: 11,
      name: "Kids Backpack",
      category: "Accessories",
      price: 12.99,
      originalPrice: 24.99,
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      age: "3-10 years",
      condition: "Good"
    },
    {
      id: 12,
      name: "Toddler Bed Set",
      category: "Gear",
      price: 34.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      age: "2-5 years",
      condition: "Like New"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-emerald-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Shop Quality Kids Items</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Browse our selection of high-quality, refurbished children's clothing, toys, and gear at affordable prices.
            </p>
            <div className="max-w-xl mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-emerald-300" />
              </div>
              <input
                type="text"
                placeholder="Search for items..."
                className="w-full pl-10 pr-4 py-3 rounded-md bg-emerald-700 text-white placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row">
            {/* Filters - Desktop */}
            <div className="hidden md:block w-64 mr-8">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                      checked={activeFilters.includes('category-clothing')}
                      onChange={() => toggleFilter('category-clothing')}
                    />
                    <span className="ml-2 text-gray-700">Clothing</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                      checked={activeFilters.includes('category-toys')}
                      onChange={() => toggleFilter('category-toys')}
                    />
                    <span className="ml-2 text-gray-700">Toys</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                      checked={activeFilters.includes('category-books')}
                      onChange={() => toggleFilter('category-books')}
                    />
                    <span className="ml-2 text-gray-700">Books</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                      checked={activeFilters.includes('category-gear')}
                      onChange={() => toggleFilter('category-gear')}
                    />
                    <span className="ml-2 text-gray-700">Baby Gear</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                      checked={activeFilters.includes('category-shoes')}
                      onChange={() => toggleFilter('category-shoes')}
                    />
                    <span className="ml-2 text-gray-700">Shoes</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                      checked={activeFilters.includes('category-accessories')}
                      onChange={() => toggleFilter('category-accessories')}
                    />
                    <span className="ml-2 text-gray-700">Accessories</span>
                  </label>
                </div>
              </div>
              
              {/* Age Range Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Age Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                      checked={activeFilters.includes('age-0-2')}
                      onChange={() => toggleFilter('age-0-2')}
                    />
                    <span className="ml-2 text-gray-700">0-2 years</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                      checked={activeFilters.includes('age-3-5')}
                      onChange={() => toggleFilter('age-3-5')}
                    />
                    <span className="ml-2 text-gray-700">3-5 years</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                      checked={activeFilters.includes('age-6-8')}
                      onChange={() => toggleFilter('age-6-8')}
                    />
                    <span className="ml-2 text-gray-700">6-8 years</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                      checked={activeFilters.includes('age-9-12')}
                      onChange={() => toggleFilter('age-9-12')}
                    />
                    <span className="ml-2 text-gray-700">9-12 years</span>
                  </label>
                </div>
              </div>
              
              {/* Condition Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Condition</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                      checked={activeFilters.includes('condition-like-new')}
                      onChange={() => toggleFilter('condition-like-new')}
                    />
                    <span className="ml-2 text-gray-700">Like New</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                      checked={activeFilters.includes('condition-excellent')}
                      onChange={() => toggleFilter('condition-excellent')}
                    />
                    <span className="ml-2 text-gray-700">Excellent</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                      checked={activeFilters.includes('condition-good')}
                      onChange={() => toggleFilter('condition-good')}
                    />
                    <span className="ml-2 text-gray-700">Good</span>
                  </label>
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                      checked={activeFilters.includes('price-under-15')}
                      onChange={() => toggleFilter('price-under-15')}
                    />
                    <span className="ml-2 text-gray-700">Under $15</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                      checked={activeFilters.includes('price-15-30')}
                      onChange={() => toggleFilter('price-15-30')}
                    />
                    <span className="ml-2 text-gray-700">$15 - $30</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                      checked={activeFilters.includes('price-30-50')}
                      onChange={() => toggleFilter('price-30-50')}
                    />
                    <span className="ml-2 text-gray-700">$30 - $50</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                      checked={activeFilters.includes('price-over-50')}
                      onChange={() => toggleFilter('price-over-50')}
                    />
                    <span className="ml-2 text-gray-700">Over $50</span>
                  </label>
                </div>
              </div>
              
              <button
                onClick={clearFilters}
                className="text-emerald-600 font-medium hover:text-emerald-700"
              >
                Clear all filters
              </button>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter Button */}
              <div className="md:hidden mb-4">
                <button
                  onClick={() => setFiltersOpen(!filtersOpen)}
                  className="flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-md"
                >
                  <div className="flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    <span>Filters</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 transform ${filtersOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Mobile Filters Panel */}
                {filtersOpen && (
                  <div className="mt-2 p-4 bg-white rounded-md shadow-md">
                    {/* Category Filter */}
                    <div className="mb-4">
                      <h3 className="font-medium mb-2">Category</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <label className="flex items-center">
                          <input 
                            type="checkbox" 
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                            checked={activeFilters.includes('category-clothing')}
                            onChange={() => toggleFilter('category-clothing')}
                          />
                          <span className="ml-2 text-gray-700">Clothing</span>
                        </label>
                        <label className="flex items-center">
                          <input 
                            type="checkbox" 
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                            checked={activeFilters.includes('category-toys')}
                            onChange={() => toggleFilter('category-toys')}
                          />
                          <span className="ml-2 text-gray-700">Toys</span>
                        </label>
                        <label className="flex items-center">
                          <input 
                            type="checkbox" 
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                            checked={activeFilters.includes('category-books')}
                            onChange={() => toggleFilter('category-books')}
                          />
                          <span className="ml-2 text-gray-700">Books</span>
                        </label>
                        <label className="flex items-center">
                          <input 
                            type="checkbox" 
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                            checked={activeFilters.includes('category-gear')}
                            onChange={() => toggleFilter('category-gear')}
                          />
                          <span className="ml-2 text-gray-700">Baby Gear</span>
                        </label>
                      </div>
                    </div>
                    
                    {/* Age Range Filter */}
                    <div className="mb-4">
                      <h3 className="font-medium mb-2">Age Range</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <label className="flex items-center">
                          <input 
                            type="checkbox" 
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                            checked={activeFilters.includes('age-0-2')}
                            onChange={() => toggleFilter('age-0-2')}
                          />
                          <span className="ml-2 text-gray-700">0-2 years</span>
                        </label>
                        <label className="flex items-center">
                          <input 
                            type="checkbox" 
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                            checked={activeFilters.includes('age-3-5')}
                            onChange={() => toggleFilter('age-3-5')}
                          />
                          <span className="ml-2 text-gray-700">3-5 years</span>
                        </label>
                        <label className="flex items-center">
                          <input 
                            type="checkbox" 
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                            checked={activeFilters.includes('age-6-8')}
                            onChange={() => toggleFilter('age-6-8')}
                          />
                          <span className="ml-2 text-gray-700">6-8 years</span>
                        </label>
                        <label className="flex items-center">
                          <input 
                            type="checkbox" 
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 rounded"
                            checked={activeFilters.includes('age-9-12')}
                            onChange={() => toggleFilter('age-9-12')}
                          />
                          <span className="ml-2 text-gray-700">9-12 years</span>
                        </label>
                      </div>
                    </div>
                    
                    <button
                      onClick={clearFilters}
                      className="text-emerald-600 font-medium hover:text-emerald-700"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
              
              {/* Active Filters */}
              {activeFilters.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {activeFilters.map(filter => (
                    <div 
                      key={filter} 
                      className="flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm"
                    >
                      <span>{filter.replace(/-/g, ' ').replace(/^(\w)/, match => match.toUpperCase())}</span>
                      <button 
                        onClick={() => toggleFilter(filter)}
                        className="ml-1 focus:outline-none"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={clearFilters}
                    className="text-emerald-600 text-sm font-medium hover:text-emerald-700"
                  >
                    Clear all
                  </button>
                </div>
              )}
              
              {/* Sort and Results Count */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">{products.length} results</p>
                <div className="flex items-center">
                  <span className="mr-2 text-gray-700">Sort by:</span>
                  <select className="border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                    <option>Best Selling</option>
                  </select>
                </div>
              </div>
              
              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-gray-600">{product.age}</span>
                          <span className="text-xs text-gray-600">{product.condition}</span>
                        </div>
                      </div>
                      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
                      <div className="mt-1 flex items-center">
                        <span className="text-gray-900 font-medium">${product.price.toFixed(2)}</span>
                        <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                        <span className="ml-2 text-xs font-semibold text-red-600">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </span>
                      </div>
                      <div className="mt-3">
                        <Link 
                          to={`/product/${product.id}`} 
                          className="block w-full bg-emerald-600 text-white text-center py-2 rounded-md hover:bg-emerald-700 transition"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center">
                  <button className="px-3 py-1 border border-gray-300 rounded-l-md text-gray-700 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 border-t border-b border-gray-300 bg-emerald-600 text-white">
                    1
                  </button>
                  <button className="px-3 py-1 border-t border-b border-gray-300 text-gray-700 hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 border-t border-b border-gray-300 text-gray-700 hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-r-md text-gray-700 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated on New Arrivals</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter to be the first to know about new products and special offers.
            </p>
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-r-md hover:bg-emerald-700 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;