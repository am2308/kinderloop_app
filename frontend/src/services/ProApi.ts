import axios from 'axios';
import { Product } from '../types/index';

interface ProductsResponse {
  success: boolean;
  count: number;
  total: number;
  totalPages: number;
  currentPage: number;
  data: Product[];
}

interface ProductResponse {
  success: boolean;
  data: Product;
}

export const getProducts = async (params: {
  category?: string;
  condition?: string;
  ageRange?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<ProductsResponse> => {
  const response = await axios.get('http://localhost:5003/api/products', { params });
  console.log("Product Details", params)
  return response.data;
};

export const getProduct = async (id: string): Promise<ProductResponse> => {
  const response = await axios.get(`http://localhost:5003/api/products/${id}`);
  return response.data;
};