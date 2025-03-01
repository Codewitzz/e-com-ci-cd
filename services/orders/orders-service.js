// Orders array
let orders = [];

// Initialize orders
export function initOrders() {
  // Load orders from localStorage if available
  const savedOrders = localStorage.getItem('orders');
  if (savedOrders) {
    orders = JSON.parse(savedOrders);
  }
}

// Get all orders
export function getOrders() {
  return orders;
}

// Create a new order
export function createOrder(order) {
  // Generate a unique order ID
  const orderId = `ORD-${Date.now().toString().slice(-6)}`;
  
  // Add order with ID
  const newOrder = {
    id: orderId,
    ...order
  };
  
  orders.push(newOrder);
  
  // Save to localStorage
  saveOrders();
  
  return newOrder;
}

// Save orders to localStorage
function saveOrders() {
  localStorage.setItem('orders', JSON.stringify(orders));
}