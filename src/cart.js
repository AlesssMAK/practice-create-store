//Логіка сторінки Cart

import {
  handleProductsListItemClick,
  addProductByIdToCart,
  addProductByIdToWishlist,
  loadCartProducts,
  closeModalCartlist,
} from './js/handlers';
import {updateCartCounter, updateWishlistCounter} from './js/helpers';
import { refs } from './js/refs';
import { getTheme, applyTheme, toggleTheme } from './js/storage';

applyTheme(getTheme());
const themeToggleBtn = document.querySelector('.theme-toggle-btn');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}



updateCartCounter();
updateWishlistCounter();
loadCartProducts();
document.addEventListener('DOMContentLoaded', () => {
  if (refs.productsList) {
    refs.productsList.addEventListener('click', handleProductsListItemClick);
  }
  refs.modalCloseBtn.addEventListener('click', closeModalCartlist);
  refs.addToCartBtn.addEventListener('click', addProductByIdToCart);
  refs.addToWishlistBtn.addEventListener('click', addProductByIdToWishlist);
});


