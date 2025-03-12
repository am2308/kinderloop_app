export interface OrderItem {
    product: {
      _id: string;
      name: string;
      image?: string;
    };
    quantity: number;
    price: number;
    _id: string;
  }
  
  export interface ShippingAddress {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }
  
  export interface Order {
    _id: string;
    user: string;
    items: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
    updatedAt: string;
  }