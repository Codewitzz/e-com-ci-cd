import { getOrders } from './orders-service.js';

// Render the orders page
export function renderOrdersPage(container) {
  const orders = getOrders();
  
  if (orders.length === 0) {
    container.innerHTML = `
      <h2>Your Orders</h2>
      <div class="empty-orders">
        <p>You haven't placed any orders yet.</p>
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
    <h2>Your Orders</h2>
    <div class="orders-list">
      ${orders.map(order => createOrderHTML(order)).join('')}
    </div>
  `;
}

// Create HTML for an order
function createOrderHTML(order) {
  // Format date
  const orderDate = new Date(order.date);
  const formattedDate = orderDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return `
    <div class="order-card">
      <div class="order-header">
        <span class="order-id">${order.id}</span>
        <span class="order-date">${formattedDate}</span>
      </div>
      <div class="order-items">
        ${order.items.map(item => `
          <div class="order-item">
            <div class="order-item-details">
              <span class="order-item-title">${item.title}</span>
              <span class="order-item-price">$${item.price.toFixed(2)}</span>
            </div>
            <span class="order-item-quantity">x${item.quantity}</span>
          </div>
        `).join('')}
      </div>
      <div class="order-total">
        Total: $${order.total.toFixed(2)}
      </div>
    </div>
  `;
}