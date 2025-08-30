//Логіка сторінки Cart
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  handleProductsListItemClick,
  addProductByIdToCart,
  addProductByIdToWishlist,
  loadCartProducts,
  closeModalCartlist,
} from './js/handlers';
import {
  updateCartCounter,
  updateWishlistCounter,
  clearProducts,
  updateCartSummary,
  updateCartTotal,
} from './js/helpers';
import { refs } from './js/refs';
import {
  getTheme,
  applyTheme,
  toggleTheme,
  addToCart,
  isInCart,
  getCart,
  saveCart,
  removeFromCart,
} from './js/storage';

applyTheme(getTheme());
const themeToggleBtn = document.querySelector('.theme-toggle-btn');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}
const searchForm = document.querySelector('.search-form');
searchForm.remove();

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

///
const buyButton = document.querySelector('.cart-summary__btn');

buyButton.addEventListener('click', () => {
  const cart = getCart();

  if (cart.length === 0) {
    iziToast.warning({
      title: 'Oops!',
      message:
        'Cart is empty. Please add products before proceeding to checkout.',
      position: 'topRight',
    });
    return;
  }

  iziToast.success({
    title: 'Success',
    message: 'You successfully bought all products in the cart!',
    position: 'topRight',
  });
  //localStorage.removeItem('cart');
  saveCart([]);
  clearProducts();
  updateCartSummary([]);
  updateCartTotal([]);
  updateCartCounter();
  return;
});
