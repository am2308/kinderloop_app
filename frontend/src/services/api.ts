import { API_BASE_URL, ENDPOINTS } from '../api/config';
import { Order, Product } from '../types/index';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

const authHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getAuthToken()}`,
});

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.products}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProduct = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.products}/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to fetch product: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const createOrder = async (order: Omit<Order, '_id'>): Promise<Order> => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.orders}`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(order),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to create order: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getMyOrders = async (): Promise<Order[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.orders}/myorders`, {
      headers: authHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to fetch orders: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getOrder = async (orderId: string): Promise<Order> => {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.orders}/${orderId}`, {
      headers: authHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to fetch order: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};