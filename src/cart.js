//Логіка сторінки Cart

import {
  buyBtnCart,
  handleProductsListItemClick,
  addProductByIdToCart,
  addProductByIdToWishlist,
} from './js/handlers';
import * as helpers from './js/helpers';
import { fetchProductsByIds } from './js/products-api';
import { refs } from './js/refs';
import { renderEmptyMessage, renderProducts } from './js/render-function';
import { getCart, getTheme, applyTheme, toggleTheme } from './js/storage';
import { closeModal } from './js/modal';

applyTheme(getTheme());
const themeToggleBtn = document.querySelector('.theme-toggle-btn');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}

document.addEventListener('DOMContentLoaded', () => {
  helpers.updateCartCounter();
  helpers.updateWishlistCounter();
});

const loadCartProducts = async () => {
  const cartListItems = getCart();

  if (!cartListItems.length) {
    renderEmptyMessage(refs.productsList, 'Your cart is empty.');
    helpers.updateCartSummary([]);
    helpers.updateCartTotal([]);
    return;
  }

  try {
    const products = await fetchProductsByIds(cartListItems);
    refs.productsList.innerHTML = '';
    renderProducts(products);
    helpers.updateCartSummary(products);
    helpers.updateCartTotal(products);
  } catch (error) {
    console.error('Помилка завантаження товарів:', error);
  }
};

const handleBackdropClick = event => {
  if (event.target === refs.modal) {
    loadCartProducts();
    refs.modal.removeEventListener('click', handleBackdropClick);
  }
};

const closeModalCartlist = () => {
  closeModal();
  loadCartProducts();
  refs.modal.removeEventListener('click', handleBackdropClick);
};

const handleCartItemClick = async event => {
  refs.modal.addEventListener('click', handleBackdropClick);
  handleProductsListItemClick(event);
};

document.addEventListener('DOMContentLoaded', () => {
  if (refs.buyBtn) {
    refs.buyBtn.addEventListener('click', buyBtnCart);
  }
  loadCartProducts();
});

document.addEventListener('DOMContentLoaded', () => {
  if (refs.productsList) {
    refs.productsList.addEventListener('click', handleCartItemClick);
  }
  refs.modalCloseBtn.addEventListener('click', closeModalCartlist);
  refs.addToCartBtn.addEventListener('click', addProductByIdToCart);
  refs.addToWishlistBtn.addEventListener('click', addProductByIdToWishlist);
});

helpers.updateCartCounter();
