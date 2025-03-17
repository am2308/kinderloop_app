// Switch to your database
use mydatabase; // Replace with your database name

// Insert products into the "products" collection
db.products.insertMany([
  {
    _id: ObjectId('67cb425071f65b16f5584a57'),
    productId: 'TOY001',
    name: 'Wooden Toy Set',
    description: 'Handcrafted wooden toy set perfect for imaginative play. Includes blocks, cars, and animals.',
    price: 24.99,
    originalPrice: 45,
    category: 'Toys',
    condition: 'Excellent',
    ageRange: '3-6 years',
    stock: 10,
    images: ['https://images.unsplash.com/photo-1596870230751-ebdfce98ec42'],
    createdAt: ISODate('2025-03-07T19:00:32.343Z')
  },
  {
    _id: ObjectId('67cb425071f65b16f5584a58'),
    productId: 'CLO001',
    name: 'Kids Winter Outfit',
    description: 'Warm and cozy winter outfit set including jacket and pants.',
    price: 18.99,
    originalPrice: 35,
    category: 'Clothing',
    condition: 'Like New',
    ageRange: '4-5 years',
    stock: 5,
    images: ['https://images.unsplash.com/photo-1519689680058-324335c77eba'],
    createdAt: ISODate('2025-03-07T19:00:32.343Z')
  },
  {
    _id: ObjectId('67cb425071f65b16f5584a59'),
    productId: 'BOK001',
    name: "Children's Book Collection",
    description: "Set of 5 educational children's books in excellent condition.",
    price: 12.99,
    originalPrice: 28,
    category: 'Books',
    condition: 'Good',
    ageRange: '2-8 years',
    stock: 3,
    images: ['https://images.pexels.com/photos/1741230/pexels-photo-1741230.jpeg'],
    createdAt: ISODate('2025-03-07T19:00:32.343Z')
  },
  {
    _id: ObjectId('67cb425071f65b16f5584a5a'),
    productId: 'GER001',
    name: 'Premium Baby Stroller',
    description: 'Lightweight, foldable stroller with multiple recline positions and storage basket.',
    price: 89.99,
    originalPrice: 179.99,
    category: 'Gear',
    condition: 'Excellent',
    ageRange: '0-3 years',
    stock: 2,
    images: ['https://images.unsplash.com/photo-1566576912321-d58ddd7a6088'],
    createdAt: ISODate('2025-03-07T19:00:32.343Z')
  },
  {
    _id: ObjectId('67cb425071f65b16f5584a5b'),
    productId: 'TOY002',
    name: 'STEM Building Blocks',
    description: 'Educational building blocks set for developing spatial awareness and creativity.',
    price: 34.99,
    originalPrice: 59.99,
    category: 'Toys',
    condition: 'Like New',
    ageRange: '4-8 years',
    stock: 7,
    images: ['https://images.unsplash.com/photo-1587654780291-39c9404d746b'],
    createdAt: ISODate('2025-03-07T19:00:32.343Z')
  },
  {
    _id: ObjectId('67cb425071f65b16f5584a5c'),
    productId: 'CLO002',
    name: 'Summer Clothing Bundle',
    description: 'Set of 5 summer outfits including shorts, t-shirts, and dresses.',
    price: 45.99,
    originalPrice: 89.99,
    category: 'Clothing',
    condition: 'Good',
    ageRange: '3-4 years',
    stock: 4,
    images: ['https://images.unsplash.com/photo-1522771930-78848d9293e8'],
    createdAt: ISODate('2025-03-07T19:00:32.343Z')
  },
  {
    _id: ObjectId('67cb425071f65b16f5584a5d'),
    productId: 'GER002',
    name: 'Child Bicycle',
    description: "Refurbished children's bicycle with training wheels and safety features.",
    price: 65.99,
    originalPrice: 129.99,
    category: 'Gear',
    condition: 'Good',
    ageRange: '4-7 years',
    stock: 3,
    images: ['https://images.unsplash.com/photo-1639236654636-f217ed6c8b24'],
    createdAt: ISODate('2025-03-07T19:00:32.343Z')
  },
  {
    _id: ObjectId('67cb425071f65b16f5584a5e'),
    productId: 'TOY003',
    name: 'Art Supply Kit',
    description: 'Complete art kit including crayons, colored pencils, markers, and drawing pad.',
    price: 19.99,
    originalPrice: 39.99,
    category: 'Toys',
    condition: 'Excellent',
    ageRange: '3-12 years',
    stock: 8,
    images: ['https://images.pexels.com/photos/3662630/pexels-photo-3662630.jpeg'],
    createdAt: ISODate('2025-03-07T19:00:32.343Z')
  },
  {
    _id: ObjectId('67cb425071f65b16f5584a5f'),
    productId: 'SHO001',
    name: 'Kids Sport Shoes',
    description: 'Comfortable athletic shoes perfect for active children.',
    price: 22.99,
    originalPrice: 44.99,
    category: 'Shoes',
    condition: 'Like New',
    ageRange: '5-6 years',
    stock: 5,
    images: ['https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2'],
    createdAt: ISODate('2025-03-07T19:00:32.343Z')
  },
  {
    _id: ObjectId('67cb425071f65b16f5584a60'),
    productId: 'TOY004',
    name: 'Baby Play Mat',
    description: 'Soft, interactive play mat with hanging toys and music.',
    price: 29.99,
    originalPrice: 59.99,
    category: 'Toys',
    condition: 'Excellent',
    ageRange: '0-12 months',
    stock: 6,
    images: ['https://images.unsplash.com/photo-1555252333-9f8e92e65df9'],
    createdAt: ISODate('2025-03-07T19:00:32.343Z')
  },
  {
    _id: ObjectId('67cb425071f65b16f5584a61'),
    productId: 'ACC001',
    name: 'School Backpack Set',
    description: 'Durable backpack with matching lunch box and pencil case.',
    price: 25.99,
    originalPrice: 49.99,
    category: 'Accessories',
    condition: 'Good',
    ageRange: '5-12 years',
    stock: 8,
    images: ['https://images.unsplash.com/photo-1558346490-a72e53ae2d4f'],
    createdAt: ISODate('2025-03-07T19:00:32.343Z'),
    featured: false,
    isRefurbished: false,
    status: 'pending',
    updatedAt: ISODate('2025-03-07T20:47:17.704Z')
  },
  {
    _id: ObjectId('67cb425071f65b16f5584a62'),
    productId: 'GER003',
    name: 'Baby High Chair',
    description: 'Adjustable high chair with removable tray and safety harness.',
    price: 49.99,
    originalPrice: 99.99,
    category: 'Gear',
    condition: 'Like New',
    ageRange: '6-36 months',
    stock: 4,
    images: ['https://images.unsplash.com/photo-1618842676088-c4d48a6a7c9d'],
    createdAt: ISODate('2025-03-07T19:00:32.343Z')
  },
  {
    _id: ObjectId('67cb425071f65b16f5584a63'),
    productId: 'BOK002',
    name: 'Interactive Board Books',
    description: 'Set of 3 touch-and-feel board books for early learning.',
    price: 15.99,
    originalPrice: 29.99,
    category: 'Books',
    condition: 'Excellent',
    ageRange: '0-3 years',
    stock: 7,
    images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f'],
    createdAt: ISODate('2025-03-07T19:00:32.343Z')
  },
  {
    _id: ObjectId('67cb425071f65b16f5584a64'),
    productId: 'CLO003',
    name: 'Baby Sleep Set',
    description: 'Set of 3 comfortable sleepwear items for infants.',
    price: 16.99,
    originalPrice: 34.99,
    category: 'Clothing',
    condition: 'Like New',
    ageRange: '0-12 months',
    stock: 8,
    images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af'],
    createdAt: ISODate('2025-03-07T19:00:32.343Z')
  },
  {
    _id: ObjectId('67cb425071f65b16f5584a65'),
    productId: 'TOY005',
    name: 'Musical Instrument Set',
    description: 'Collection of kid-friendly musical instruments including tambourine, xylophone, and drums.',
    price: 32.99,
    originalPrice: 64.99,
    category: 'Toys',
    condition: 'Good',
    ageRange: '2-8 years',
    stock: 5,
    images: ['https://images.unsplash.com/photo-1621112904887-419379ce6824'],
    createdAt: ISODate('2025-03-07T19:00:32.343Z')
  },
  {
    _id: ObjectId('67cb425071f65b16f5584a66'),
    productId: 'SHO002',
    name: 'Winter Boots',
    description: 'Waterproof winter boots with warm lining.',
    price: 28.99,
    originalPrice: 54.99,
    category: 'Shoes',
    condition: 'Excellent',
    ageRange: '4-5 years',
    stock: 6,
    images: ['https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2'],
    createdAt: ISODate('2025-03-07T19:00:32.343Z')
  },
  {
    _id: ObjectId('67cb425071f65b16f5584a67'),
    productId: 'ACC002',
    name: 'Kids Watch Set',
    description: 'Educational analog watch with interchangeable straps.',
    price: 14.99,
    originalPrice: 29.99,
    category: 'Accessories',
    condition: 'Like New',
    ageRange: '5-12 years',
    stock: 10,
    images: ['https://images.unsplash.com/photo-1542496658-e33a6d0d50f6'],
    createdAt: ISODate('2025-03-07T19:00:32.343Z')
  },
  {
    _id: ObjectId('67cb425071f65b16f5584a68'),
    productId: 'GER004',
    name: 'Baby Monitor',
    description: 'Digital baby monitor with night vision and two-way audio.',
    price: 39.99,
    originalPrice: 79.99,
    category: 'Gear',
    condition: 'Excellent',
    ageRange: '0-3 years',
    stock: 4,
    images: ['https://images.unsplash.com/photo-1594385208974-2c0bd59f21af'],
    createdAt: ISODate('2025-03-07T19:00:32.343Z')
  }
]);

// Print success message
print('Products inserted successfully!');
