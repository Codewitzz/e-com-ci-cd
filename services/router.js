import { renderProductsPage } from './products/products-view.js';
import { renderCartPage } from './cart/cart-view.js';
import { renderOrdersPage } from './orders/orders-view.js';

// Current active page
let currentPage = 'products';

// Router function to navigate between pages
export function navigateTo(page) {
  currentPage = page;
  updateUI();
}

// Initialize router
export function initRouter() {
  // Add event listeners to navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = e.target.dataset.page;
      navigateTo(page);
    });
  });
  
  // Initial render
  updateUI();
}

// Update UI based on current page
function updateUI() {
  // Highlight active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.dataset.page === currentPage) {
      link.style.fontWeight = 'bold';
      link.style.color = 'var(--primary-color)';
    } else {
      link.style.fontWeight = '500';
      link.style.color = 'var(--text-color)';
    }
  });
  
  // Render the appropriate page
  const appContainer = document.getElementById('app');
  
  switch (currentPage) {
    case 'products':
      renderProductsPage(appContainer);
      break;
    case 'cart':
      renderCartPage(appContainer);
      break;
    case 'orders':
      renderOrdersPage(appContainer);
      break;
    default:
      renderProductsPage(appContainer);
  }
}