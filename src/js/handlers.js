import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

import { activeFirstBtn, clearProducts, highlightActiveCategory, updateCartCounter, updateWishlistCounter, updateWishlistBtnText} from './helpers';
import { fetchCategories, fetchProducts, fetchModal,  fetchByCategory, fetchQuery  } from './products-api';
import { renderCategories, renderProducts, renderEmptyMessage, renderModal } from './render-function';
import { refs } from './refs.js';
import { openModal } from './modal.js';
import { currentProductId, updateCartBtnText } from '../cart.js';
import { addToWishlist, addToCart, isInCart, isInWishlist, removeFromCart, removeFromWishlist } from './storage.js';

let currentPage = 1;


export const getCategories = async () => {
  try {
    const data = await fetchCategories();
    
    renderCategories(['All', ...data]);
    activeFirstBtn();
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
  }
};

export const getProducts = async () => {
  try {
    const { products, total } = await fetchProducts(currentPage);
    
    renderProducts(products);
  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
    
  }
};

// Модальне вікно
export const getModal = async (event) => {
  const card = event.target.closest(".products__item");
  const cardId = card.dataset.id;  
  
  try {
    const data = await fetchModal(cardId);
    openModal(cardId);
    renderModal(data);


  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message });
    
  }
}


//  Клік по категорії ===
export const handleCategoryClick = async (e) => {
  if (!e.target.classList.contains('categories__btn')) return;

  const currentCategory = e.target.textContent;

  
 
  refs.productsList.innerHTML = '';

  try {
    const data = await fetchByCategory(currentCategory);
    renderProducts(data.products);
    highlightActiveCategory(e.target);
  } catch (err) {
    iziToast.error({ title: 'Error', message: err.message });
  }
};


export const getProductsByQuery = async (event) => { 
  event.preventDefault();
  const query = event.target.elements.searchValue.value.trim();

  

  if (!query) return;

  try {
    const { products } = await fetchQuery(query, currentPage);
    
    if (products.length === 0) {
      console.log("ok");
      clearProducts();
      return refs.notFoundDiv.classList.add("not-found--visible");
    } else {
      renderProducts(products);
    };    
  } catch (error) {
iziToast.error({ title: 'Error', message: error.message });
  }
};

export const getClearForm = () => {
  refs.form.reset();
  getProducts();
}

// click add/remove to/from cart

export const addProductByIdToCart = () => {
  if(currentProductId === null) {
   return;
  }  

  if(isInCart(currentProductId)) {
    removeFromCart(currentProductId);
  } else {
    addToCart(currentProductId);
  }

  updateCartBtnText();
  updateCartCounter();
};

//Iryna Wishlist click handler

export const addProductByIdToWishlist = () => {
  if(currentProductId === null) {
   return;
  }  

  if(isInWishlist(currentProductId)) {
    removeFromWishlist(currentProductId);
  } else {
    addToWishlist(currentProductId);
  }

  updateWishlistBtnText(currentProductId);
  updateWishlistCounter();
};

