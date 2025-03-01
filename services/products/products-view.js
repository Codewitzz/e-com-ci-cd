import { getAllProducts } from './products-service.js';
import { addToCart } from '../cart/cart-service.js';

// Render the products page
export function renderProductsPage(container) {
  const products = getAllProducts();
  
  container.innerHTML = `
    <h2>Our Products</h2>
    <div class="products-grid">
      ${products.map(product => createProductCard(product)).join('')}
    </div>
  `;
  
  // Add event listeners to "Add to Cart" buttons
  container.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      const productId = parseInt(e.target.dataset.id);
      addToCart(productId);
      
      // Show added feedback on button
      const originalText = e.target.textContent;
      e.target.textContent = 'Added to Cart!';
      e.target.style.backgroundColor = 'var(--success)';
      
      setTimeout(() => {
        e.target.textContent = originalText;
        e.target.style.backgroundColor = 'var(--primary-color)';
      }, 1500);
    });
  });
}

// Create a product card HTML
function createProductCard(product) {
  return `
    <div class="product-card">
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <p class="product-description">${product.description}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    </div>
  `;
}