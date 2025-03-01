import { getCartItems, removeFromCart, updateQuantity, calculateTotal, checkout } from './cart-service.js';

// Render the cart page
export function renderCartPage(container) {
  const cartItems = getCartItems();
  const total = calculateTotal();
  
  if (cartItems.length === 0) {
    container.innerHTML = `
      <h2>Your Cart</h2>
      <div class="empty-cart">
        <p>Your cart is empty.</p>
        <button id="shop-now-btn" class="add-to-cart">Shop Now</button>
      </div>
    `;
    
    // Add event listener to "Shop Now" button
    const shopNowBtn = container.querySelector('#shop-now-btn');
    if (shopNowBtn) {
      shopNowBtn.addEventListener('click', () => {
        document.querySelector('[data-page="products"]').click();
      });
    }
    
    return;
  }
  
  container.innerHTML = `
    <h2>Your Cart</h2>
    <div class="cart-items">
      ${cartItems.map(item => createCartItemHTML(item)).join('')}
    </div>
    <div class="cart-summary">
      <div class="cart-total">
        <span>Total:</span>
        <span>$${total.toFixed(2)}</span>
      </div>
      <button id="checkout-btn" class="checkout-btn">Proceed to Checkout</button>
    </div>
  `;
  
  // Add event listeners
  addCartEventListeners(container);
}

// Create HTML for a cart item
function createCartItemHTML(item) {
  return `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.title}" class="cart-item-image">
      <div class="cart-item-details">
        <h3 class="cart-item-title">${item.title}</h3>
        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
        <div class="cart-item-quantity">
          <button class="quantity-btn decrease">-</button>
          <span class="quantity-value">${item.quantity}</span>
          <button class="quantity-btn increase">+</button>
        </div>
      </div>
      <button class="remove-item">Remove</button>
    </div>
  `;
}

// Add event listeners to cart elements
function addCartEventListeners(container) {
  // Decrease quantity
  container.querySelectorAll('.decrease').forEach(button => {
    button.addEventListener('click', (e) => {
      const cartItem = e.target.closest('.cart-item');
      const id = parseInt(cartItem.dataset.id);
      const quantityElement = cartItem.querySelector('.quantity-value');
      const currentQuantity = parseInt(quantityElement.textContent);
      
      if (currentQuantity > 1) {
        updateQuantity(id, currentQuantity - 1);
        quantityElement.textContent = currentQuantity - 1;
        updateCartSummary(container);
      }
    });
  });
  
  // Increase quantity
  container.querySelectorAll('.increase').forEach(button => {
    button.addEventListener('click', (e) => {
      const cartItem = e.target.closest('.cart-item');
      const id = parseInt(cartItem.dataset.id);
      const quantityElement = cartItem.querySelector('.quantity-value');
      const currentQuantity = parseInt(quantityElement.textContent);
      
      updateQuantity(id, currentQuantity + 1);
      quantityElement.textContent = currentQuantity + 1;
      updateCartSummary(container);
    });
  });
  
  // Remove item
  container.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', (e) => {
      const cartItem = e.target.closest('.cart-item');
      const id = parseInt(cartItem.dataset.id);
      
      removeFromCart(id);
      
      // Animate removal
      cartItem.style.opacity = '0';
      cartItem.style.transform = 'translateX(20px)';
      cartItem.style.transition = 'all 0.3s ease';
      
      setTimeout(() => {
        cartItem.remove();
        
        // Check if cart is empty after removal
        if (getCartItems().length === 0) {
          renderCartPage(container);
        } else {
          updateCartSummary(container);
        }
      }, 300);
    });
  });
  
  // Checkout button
  const checkoutBtn = container.querySelector('#checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      checkout();
    });
  }
}

// Update cart summary (total price)
function updateCartSummary(container) {
  const total = calculateTotal();
  const totalElement = container.querySelector('.cart-total span:last-child');
  
  if (totalElement) {
    totalElement.textContent = `$${total.toFixed(2)}`;
  }
}