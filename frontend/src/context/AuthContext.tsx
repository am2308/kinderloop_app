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
  isAuthenticated: boolean;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      fetchUserDetails();
    }
  }, []);
  
  /*
  useEffect(() => {
    console.log("🌟 Checking authentication state on mount...");
  
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
  
    console.log("🔑 Token found:", token);
    console.log("👤 Stored User:", storedUser ? JSON.parse(storedUser) : "No user found");
  
    if (token && storedUser) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const parsedUser = JSON.parse(storedUser);
      
      if (parsedUser && parsedUser.id) {
        setUser(parsedUser);
        setIsAuthenticated(true);
        console.log("✅ User loaded from localStorage:", parsedUser);
      } else {
        console.log("❌ Invalid user data found, resetting auth...");
        setUser(null);
        setIsAuthenticated(false);
      }
    } else {
      console.log("❌ No token or user found, user is not authenticated.");
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);
  */

  // Method to fetch user details
  //const fetchUserDetails = async () => {
  //  try {
  //    const res = await axios.get('/api/auth/me');
  //    const userData = {
  //      ...res.data,
  //      id: res.data._id // Map _id to id for consistency
  //    };
  //    setUser(userData);
  //    setIsAuthenticated(true);
  //    localStorage.setItem('user', JSON.stringify(userData));
  //  } catch (err) {
  //    console.error('Error fetching user details:', err);
  //    logout();
  //  }
  //};

  const fetchUserDetails = async () => { 
    try {
      //const res = await axios.get('/api/auth/me');

      const token = localStorage.getItem('token'); // Get token from localStorage
      if (!token) {
        console.error("❌ No token found, user is not authenticated");
        setUser(null);
        setIsAuthenticated(false);
        return;
      }
      const res = await axios.get('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`  // ✅ Pass the token in Authorization header
        }
      });
      console.log("Fetch User Response:", res.data.data); // ✅ Debug API response

      if (res.data) {
        const userData = { ...res.data, id: res.data._id };
        setUser(userData);
        setIsAuthenticated(true);
        // localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (err) {
      console.error('Error fetching user details:', err);
      // Don't immediately log out on a failed request; retry first.
    }
  };
  /*
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }
  
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      const res = await axios.get('/api/auth/me');
  
      console.log("Fetch User Response:", res.data); // ✅ Debug API response
  
      if (res.data && res.data._id) {
        const userData = { ...res.data, id: res.data._id };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
  
        console.log("User Loaded:", userData); // ✅ Confirm user data
      } else {
        console.log("Invalid user data received");
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Error fetching user details:', err);
      setUser(null);
      setIsAuthenticated(false);
    }
  };
  */
  

  const login = async (email: string, password: string) => {
    const res = await axios.post('/api/auth/login', { email, password });
    //const userData = {
    //  ...res.data.user,
    //  id: res.data.user._id // Map _id to id for consistency
    //};
    const userData = res.data.user;
    console.log("Storing userData in localStorage:", res.data);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log("User Demo Data:", localStorage.getItem('user'));
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    setUser(userData);
    setIsAuthenticated(true);
    console.log("✅ Login successful, stored user:", userData);
    //window.location.reload(); // Ensure correct state updates
  };

  /*
  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
  
      console.log("Login Response:", res.data); // ✅ Debug API response
  
      const userData = {
        ...res.data.user,
        id: res.data.user._id // Ensure ID is mapped correctly
      };
  
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
  
      setUser(userData);
      setIsAuthenticated(true);
  
      console.log("AuthContext Updated - User:", userData); // ✅ Verify user state update
  
      // Force state update to reflect changes
      window.location.reload();  // ✅ Forces full state reload
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  */

  const register = async (name: string, email: string, password: string, role: string) => {
    const res = await axios.post('/api/auth/register', { name, email, password, role });
    const userData = {
      ...res.data.user,
      id: res.data.user.id // Map _id to id for consistency
    };
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(userData));
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    setUser(userData);
    setIsAuthenticated(true);
  };

  //const logout = () => {
  //  localStorage.removeItem('token');
  //  localStorage.removeItem('user');
  //  delete axios.defaults.headers.common['Authorization'];
  //  setUser(null);
  //  setIsAuthenticated(false);
  //};

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    //localStorage.clear();
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };
  /*
  const logout = () => {
    console.log("🚪 Logging out... Clearing user data");
  
    const userId = user?.id;
    if (userId) {
      console.log(`🗑️ Removing cart_${userId} from storage`);
      localStorage.removeItem(`cart_${userId}`);
    }
  
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  
    setUser(null);
    setIsAuthenticated(false);
  
    window.location.reload(); // Force refresh
  };
  */


  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, fetchUserDetails }}>
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