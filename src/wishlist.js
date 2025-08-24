//Логіка сторінки Wishlist
import { updateWishlistCounter, updateCartCounter } from './js/helpers';
import { refs } from './js/refs';
import {
  isInWishlist,
  getWishlist,
  getTheme,
  applyTheme,
  toggleTheme,
} from './js/storage';
import { fetchProductsByIds } from './js/products-api';
import { renderProducts, renderEmptyMessage } from './js/render-function';
import {
  handleProductsListItemClick,
  addProductByIdToWishlist,
  addProductByIdToCart,
} from './js/handlers';
import { closeModal } from './js/modal';

applyTheme(getTheme());
const themeToggleBtn = document.querySelector('.theme-toggle-btn');
if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', toggleTheme);
}

const LoadWishListProducts = async () => {
  const wishlistItems = getWishlist();

  if (wishlistItems.length === 0) {
    renderEmptyMessage(refs.productsList, 'Your wishlist is empty.');
    return;
  }

  const wishlistProducts = await fetchProductsByIds(wishlistItems);
  refs.productsList.innerHTML = '';
  renderProducts(wishlistProducts);
};
const closeModalWishlist = () => {
  closeModal();
  LoadWishListProducts();
};

LoadWishListProducts();
refs.productsList.addEventListener('click', handleProductsListItemClick);
refs.modalCloseBtn.addEventListener('click', closeModalWishlist);
refs.addToCartBtn.addEventListener('click', addProductByIdToCart);
refs.addToWishlistBtn.addEventListener('click', addProductByIdToWishlist);
updateWishlistCounter();
updateCartCounter();
