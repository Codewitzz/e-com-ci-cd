// Sample product data
export const products = [
  {
    id: 1,
    title: 'iphone x',
    price: 799,
    description: 'Latest smartphone with advanced camera and long battery life.',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 2,
    title: 'MacBook Pro M3',
    price: 700.99,
    description: 'Powerful laptop for professionals with high-performance specs.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww'
  },
  {
    id: 3,
    title: 'Wireless Headphones',
    price: 149.99,
    description: 'Premium noise-cancelling headphones with crystal clear sound.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 4,
    title: 'Smart Watch',
    price: 249.99,
    description: 'Feature-rich smartwatch with health monitoring and notifications.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 5,
    title: 'Wireless Earbuds',
    price: 89.99,
    description: 'Compact wireless earbuds with amazing sound quality and comfort.',
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 6,
    title: 'Digital Camera',
    price: 599.99,
    description: 'High-resolution digital camera for professional photography.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FtZXJhfGVufDB8fDB8fHww'
  }
];

// Function to get a product by ID
export function getProductById(id) {
  return products.find(product => product.id === id);
}