
import {
  addProductByIdToCart,
  getCategories,
  getClearForm,
  getProducts,
  getProductsByQuery,
  handleCategoryClick,
  handleProductsListItemClick,
  addProductByIdToWishlist,
  addProductByIdToCart
} from './js/handlers';
import { closeModal } from './js/modal';
import { refs } from './js/refs';
import { updateWishlistCounter } from './js/helpers';

//Логіка сторінки Home
getCategories();
getProducts();
updateWishlistCounter();
refs.categoryList.addEventListener('click', handleCategoryClick);
refs.productsList.addEventListener("click", handleProductsListItemClick);
refs.modalCloseBtn.addEventListener("click", closeModal);
refs.form.addEventListener("submit", getProductsByQuery);
refs.formBtnClear.addEventListener("click", getClearForm);
refs.addToCartBtn.addEventListener('click', addProductByIdToCart);
refs.addToWishlistBtn.addEventListener('click', addProductByIdToWishlist);
