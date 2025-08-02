import { getProducts, getCategories, handleClearForm, handleProductsByQuery, handleCategoryClick, handleProductsListItemClick, addProductByIdToWishlist,addProductByIdToCart, handleLoadMoreClick } from './js/handlers';
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
refs.loadMoreBtn.addEventListener("click", handleLoadMoreClick);
refs.form.addEventListener("submit", handleProductsByQuery);
refs.formBtnClear.addEventListener("click", handleClearForm);
refs.addToCartBtn.addEventListener('click', addProductByIdToCart);
refs.addToWishlistBtn.addEventListener('click', addProductByIdToWishlist);