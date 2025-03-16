import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ChevronDown, Search, X, Loader2 } from 'lucide-react';
import { getProducts } from '../services/ProApi';
import { Product } from '../types/index';
import axios from 'axios';

const ShopPage = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');

  //useEffect(() => {
  //  fetchProducts();
  //}, [activeFilters, searchTerm, currentPage, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]); // Depend only on `currentPage`
  

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Parse active filters
      const filters: any = {};
      activeFilters.forEach(filter => {
        const [type, value] = filter.split('-');
        if (type === 'category') filters.category = value;
        if (type === 'condition') filters.condition = value;
        if (type === 'age') filters.ageRange = value;
        if (type === 'price') {
          if (value === 'under15') filters.maxPrice = 15;
          if (value === '15-30') { filters.minPrice = 15; filters.maxPrice = 30; }
          if (value === '30-50') { filters.minPrice = 30; filters.maxPrice = 50; }
          if (value === 'over50') filters.minPrice = 50;
        }
      });

      const response = await getProducts({
        ...filters,
        search: searchTerm,
        sort: sortBy,
        page: Number(currentPage),
        limit: 12
      });
      const poduct_count = await axios.get('http://localhost:5003/api/products'); 
      //poduct_count.data.count; // Assuming API returns { count: 18 }
      //console.log("Product API Response:", poduct_count.data?.pagination?.next?.page);
      //const totalRecords = response.count;
      //const totalPagesCalculated = Math.ceil(totalRecords / 12);
      setTotalPages(Number(poduct_count.data?.pagination?.next?.page));

      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
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
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
    console.log("Navigating to Page:", pageNumber, "Total Pages:", totalPages);
  };
  

  // Rest of your component remains the same, but use the products state instead of hardcoded data
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
            <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-emerald-300" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for items..."
                className="w-full pl-10 pr-4 py-3 rounded-md bg-emerald-700 text-white placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </form>
          </div>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row">
            {/* Filters section remains the same */}
            
            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter Button remains the same */}
              
              {/* Active Filters remains the same */}
              
              {/* Sort and Results Count */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">{products.length} results</p>
                <div className="flex items-center">
                  <span className="mr-2 text-gray-700">Sort by:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="createdAt">Featured</option>
                    <option value="price">Price: Low to High</option>
                    <option value="-price">Price: High to Low</option>
                    <option value="-createdAt">Newest</option>
                  </select>
                </div>
              </div>
              
              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={product.images[0] || 'https://via.placeholder.com/300'} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
                      <span className="text-gray-900 font-medium">${product.price.toFixed(2)}</span>
                      <div className="mt-3">
                        <Link 
                          to={`/product/${product._id}`} 
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
                  <button 
                    onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => goToPage(i + 1)}
                      className={`px-3 py-1 border-t border-b border-gray-300 ${
                        currentPage === i + 1 ? 'bg-emerald-600 text-white' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section remains the same */}
    </div>
  );
};

export default ShopPage;