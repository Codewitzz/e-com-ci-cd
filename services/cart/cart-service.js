import { getProduct } from '../products/products-service.js';
import { navigateTo } from '../router.js';
import { createOrder } from '../orders/orders-service.js';
import { showNotification } from '../notification.js';

// Cart items array
let cartItems = [];

// Initialize cart
export function initCart() {
  // Load cart from localStorage if available
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cartItems = JSON.parse(savedCart);
    updateCartCount();
  }
}

// Get all cart items
export function getCartItems() {
  return cartItems;
}

// Add a product to the cart
export function addToCart(productId) {
  const product = getProduct(productId);
  
  if (!product) return;
  
  // Check if product is already in cart
  const existingItem = cartItems.find(item => item.id === productId);
  
  if (existingItem) {
    // Increase quantity if already in cart
    existingItem.quantity += 1;
    
    // Show notification
    showNotification({
      title: 'Item quantity updated',
      message: `${product.title} quantity increased to ${existingItem.quantity}`,
      productImage: product.image,
      actionText: 'View Cart',
      actionCallback: () => navigateTo('cart')
    });
  } else {
    // Add new item to cart
    cartItems.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    
    // Show notification
    showNotification({
      title: 'Item added to cart',
      message: `${product.title} has been added to your cart`,
      productImage: product.image,
      actionText: 'View Cart',
      actionCallback: () => navigateTo('cart')
    });
  }
  
  // Save cart to localStorage
  saveCart();
  
  // Update cart count in UI
  updateCartCount();
}

// Remove an item from the cart
export function removeFromCart(productId) {
  cartItems = cartItems.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
}

// Update item quantity in cart
export function updateQuantity(productId, quantity) {
  const item = cartItems.find(item => item.id === productId);
  
  if (item) {
    item.quantity = Math.max(1, quantity); // Ensure quantity is at least 1
    saveCart();
    updateCartCount();
  }
}

// Calculate total price of items in cart
export function calculateTotal() {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

// Update cart count in UI
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// Checkout process
export function checkout() {
  if (cartItems.length === 0) return;
  
  // Create a new order
  const order = {
    items: [...cartItems],
    total: calculateTotal(),
    date: new Date().toISOString()
  };
  
  // Add order to orders
  createOrder(order);
  
  // Clear cart
  cartItems = [];
  saveCart();
  updateCartCount();
  
  // Show notification
  showNotification({
    title: 'Order placed successfully',
    message: 'Thank you for your purchase!',
    type: 'success'
  });
  
  // Navigate to orders page
  navigateTo('orders');
}