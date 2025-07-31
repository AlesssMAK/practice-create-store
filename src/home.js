import { getCategories, getClearForm, getProducts, getProductsByQuery, handleCategoryClick, handleProductsListItemClick } from './js/handlers';
import { closeModal } from './js/modal';
import { refs } from './js/refs';

//Логіка сторінки Home
getCategories();
getProducts();

refs.categoryList.addEventListener('click', handleCategoryClick);
refs.productsList.addEventListener("click", handleProductsListItemClick);
refs.modalCloseBtn.addEventListener("click", closeModal);
refs.form.addEventListener("submit", getProductsByQuery);
refs.formBtnClear.addEventListener("click", getClearForm);