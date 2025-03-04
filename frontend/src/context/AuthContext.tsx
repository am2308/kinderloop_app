import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Define the shape of the user object
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Define the shape of the AuthContext
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  fetchUserDetails: () => Promise<void>;
}

// Create the AuthContext with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    console.log("User state updated:", localStorage.getItem('user'));
    console.log("Fetching user from localStorage on load...");
    console.log("Token in localStorage:", localStorage.getItem("token"));
    console.log("Stored User in localStorage:", localStorage.getItem("user"));
    if (token && storedUser) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(JSON.parse(storedUser)); // Set user from localStorage
      fetchUserDetails(); // Fetch updated user details from the server
    }
  }, []);

  // Method to fetch user details
  const fetchUserDetails = async () => {
    try {
      const res = await axios.get('/api/auth/me');
      console.log('User Details API Response:', res.data); // Log the response
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data)); // Save user data
    } catch (err) {
      console.error('Error fetching user details:', err);
      logout(); // Logout the user if there's an error fetching details
    }
  };

  const login = async (email: string, password: string) => {
    const res = await axios.post('/api/auth/login', { email, password });
    console.log('Login API Response:', res.data); // Log the response
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    console.log('Userr Token', localStorage.getItem("token"));
    console.log(localStorage.getItem("user"));
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    await fetchUserDetails(); // Fetch updated user details
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    const res = await axios.post('/api/auth/register', { name, email, password, role });
    localStorage.setItem('token', res.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    await fetchUserDetails(); // Fetch updated user details
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Remove user data
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, fetchUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};