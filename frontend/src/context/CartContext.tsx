import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../types/index';
import { useAuth } from './AuthContext';

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState };

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(
        item => item.product._id === action.payload._id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          totalAmount: state.totalAmount + action.payload.price,
        };
      }

      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
        totalAmount: state.totalAmount + action.payload.price,
      };
    }

    case 'REMOVE_FROM_CART': {
      const item = state.items.find(item => item.product._id === action.payload);
      return {
        ...state,
        items: state.items.filter(item => item.product._id !== action.payload),
        totalAmount: state.totalAmount - (item ? item.product.price * item.quantity : 0),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.product._id === productId);
      
      if (!item) return state;

      const quantityDiff = quantity - item.quantity;
      
      return {
        ...state,
        items: state.items.map(item =>
          item.product._id === productId
            ? { ...item, quantity }
            : item
        ),
        totalAmount: state.totalAmount + (item.product.price * quantityDiff),
      };
    }

    case 'CLEAR_CART':
      return initialState;

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }
};

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, isAuthenticated } = useAuth();

  // Get cart key based on user
  const getCartKey = () => {
    if (!isAuthenticated || !user || !user.data || !user.data.data || !user.data.data._id) return 'cart_guest';
    return `cart_${user.data.data._id}`;
  };
  /*
  const getCartKey = () => {
    console.log("Fetching Cart Key - User:", user); // ✅ Debug user data
  
    if (!isAuthenticated || !user || !user.id) return 'cart_guest';
  
    return `cart_${user.id}`;
  };
  */
  // Debugging: Log user ID and cart key
  console.log("User ID:", user?.data?.data?._id);
  console.log("Cart Key:", getCartKey());

  // Load cart from localStorage on mount and when user changes
  useEffect(() => {
    const cartKey = getCartKey();
    console.log("Loading cart for key:", cartKey);
    
    if (!cartKey) {
      dispatch({ type: 'CLEAR_CART' });
      return;
    }
  
    try {
      const savedCart = localStorage.getItem(cartKey);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } else {
        dispatch({ type: 'CLEAR_CART'});
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      dispatch({ type: 'CLEAR_CART' });
    }
    // Cleanup function to clear the cart state when the user changes
    return () => {
      dispatch({ type: 'CLEAR_CART' });
    };
  }, [user?.data?.data?._id, isAuthenticated]);
  /*
  // Load cart from localStorage on mount and when user changes
  useEffect(() => {
    console.log("🛒 Fetching cart for user...");
    console.log("🔹 isAuthenticated:", isAuthenticated);
    console.log("🔹 Current User:", user);
  
    const cartKey = getCartKey();
  
    console.log("🛍️ Using Cart Key:", cartKey);
  
    if (!cartKey) return;
  
    try {
      const savedCart = localStorage.getItem(cartKey);
      console.log("📦 Cart from Storage:", savedCart ? JSON.parse(savedCart) : "No cart found");
  
      if (savedCart) {
        dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
      } else {
        dispatch({ type: 'CLEAR_CART' });
      }
    } catch (error) {
      console.error('❌ Error loading cart:', error);
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [user?.id, isAuthenticated]); // Depend on user.id & isAuthenticated
  */
  

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isAuthenticated && user?.data?.data?._id) {
      const cartKey = getCartKey();
      try {
        localStorage.setItem(cartKey, JSON.stringify(state));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    }
  }, [state, user?.data?.data?._id, isAuthenticated]);

  const addToCart = (product: Product, quantity: number = 1) => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    // Remove cart from localStorage
    const cartKey = getCartKey();
    localStorage.removeItem(cartKey);
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};