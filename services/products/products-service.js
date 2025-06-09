import { products } from './products-data.js';

// Store for products
let productStore = [];

// Load products from data
export function loadProducts() {
  productStore = [...products];
  return productStore;
}

// Get all products
export function getAllProducts() {
  return productStore;
}

// Get a product by ID
export function getProduct(id) {
  return productStore.find(product => product.id === parseInt(id));
}