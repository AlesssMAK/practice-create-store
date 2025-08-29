import {
  getProducts,
  getCategories,
  handleClearForm,
  handleProductsByQuery,
  handleCategoryClick,
  handleProductsListItemClick,
  addProductByIdToWishlist,
  addProductByIdToCart,
  handleLoadMoreClick,
} from './js/handlers';
import { closeModal } from './js/modal';
import { refs } from './js/refs';
import {
  updateWishlistCounter,
  updateCartCounter,
  toggleScrollButton,
} from './js/helpers';
import { getTheme, applyTheme, toggleTheme } from './js/storage';

//Логіка сторінки Home
getCategories();
getProducts();
updateWishlistCounter();
updateCartCounter();
applyTheme(getTheme());
refs.categoryList.addEventListener('click', handleCategoryClick);
refs.productsList.addEventListener('click', handleProductsListItemClick);
refs.modalCloseBtn.addEventListener('click', closeModal);
refs.loadMoreBtn.addEventListener('click', handleLoadMoreClick);
refs.form.addEventListener('submit', handleProductsByQuery);
refs.formBtnClear.addEventListener('click', handleClearForm);
refs.addToCartBtn.addEventListener('click', addProductByIdToCart);
refs.addToWishlistBtn.addEventListener('click', addProductByIdToWishlist);
window.addEventListener('scroll', toggleScrollButton);

const themeToggleBtn = document.querySelector('.theme-toggle-btn');
themeToggleBtn.addEventListener('click', toggleTheme);

refs.scrollBtn.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
