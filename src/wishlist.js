//Логіка сторінки Wishlist
import { updateWishlistCounter, updateCartCounter } from './js/helpers';
import { refs } from './js/refs';
import {
  getTheme,
  applyTheme,
  toggleTheme,
} from './js/storage';
import {
  handleProductsListItemClick,
  addProductByIdToWishlist,
  addProductByIdToCart,
  LoadWishListProducts,
  handleProductsByQuery,
  closeModalWishlist,
} from './js/handlers';

applyTheme(getTheme());
const themeToggleBtn = document.querySelector('.theme-toggle-btn');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}



LoadWishListProducts();

refs.productsList.addEventListener('click', handleProductsListItemClick);
refs.modalCloseBtn.addEventListener('click', closeModalWishlist);
refs.addToCartBtn.addEventListener('click', addProductByIdToCart);
refs.addToWishlistBtn.addEventListener('click', addProductByIdToWishlist);
refs.form.addEventListener('submit', handleProductsByQuery);
updateWishlistCounter();
updateCartCounter();
