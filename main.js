import { initRouter } from './services/router.js';
import { loadProducts } from './services/products/products-service.js';
import { initCart } from './services/cart/cart-service.js';
import { initOrders } from './services/orders/orders-service.js';

// Initialize the application
function initApp() {
  // Initialize services
  loadProducts();
  initCart();
  initOrders();
  
  // Initialize router
  initRouter();
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);