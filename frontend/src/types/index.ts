export interface Product {
    _id: string;
    productId: string;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    category: string;
    condition: string;
    ageRange: string;
    stock: number;
    images: string[];
    createdAt: string;
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
  }
  
  export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
  }
  
  export interface Order {
    _id?: string;
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt?: Date;
  }

  export interface ListedItem {
    _id: string;
    seller: string;
    type: string;
    price: number;
    count: number;
    description: string;
    category: string;
    weight?: string;
    dimensions?: string;
    itemUrl?: string;
    wantsPackaging: boolean;
    address?: string;
    images: string[];
    status: 'pending' | 'approved' | 'rejected' | 'sold';
    createdAt: string;
    updatedAt: string;
  }