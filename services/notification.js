// Create and show a notification
export function showNotification({ title, message, type = 'success', duration = 5000, productImage, actionText, actionCallback }) {
  // Get or create notification container
  const container = document.getElementById('notification-container');
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  
  // Create notification content
  let iconContent = '✓';
  if (type === 'error') iconContent = '✕';
  if (type === 'info') iconContent = 'i';
  
  // Build notification HTML
  let notificationHTML = `
    <div class="notification-icon">${iconContent}</div>
    <div class="notification-content">
      <div class="notification-title">${title}</div>
      <div class="notification-message">${message}</div>
  `;
  
  // Add product image if provided
  if (productImage) {
    notificationHTML += `
      <div class="notification-product">
        <img src="${productImage}" alt="Product" class="notification-product-image">
      </div>
    `;
  }
  
  // Add action button if provided
  if (actionText && actionCallback) {
    notificationHTML += `
      <button class="notification-action">${actionText}</button>
    `;
  }
  
  notificationHTML += `
    </div>
    <button class="notification-close">&times;</button>
  `;
  
  notification.innerHTML = notificationHTML;
  
  // Add to container
  container.appendChild(notification);
  
  // Show notification with animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Add event listener to close button
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    closeNotification(notification);
  });
  
  // Add event listener to action button if provided
  if (actionText && actionCallback) {
    const actionBtn = notification.querySelector('.notification-action');
    actionBtn.addEventListener('click', () => {
      actionCallback();
      closeNotification(notification);
    });
  }
  
  // Auto close after duration
  if (duration > 0) {
    setTimeout(() => {
      closeNotification(notification);
    }, duration);
  }
  
  return notification;
}

// Close notification with animation
function closeNotification(notification) {
  notification.classList.remove('show');
  
  // Remove from DOM after animation completes
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 500);
}