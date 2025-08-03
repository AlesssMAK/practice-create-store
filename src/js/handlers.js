import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { currentProductId, updateCartBtnText, activeFirstBtn, clearProducts, updateCartCounter, updateCartSummary, updateCartTotal, updateWishlistCounter, updateWishlistBtnText, showLoadMoreButton, hideLoadMoreButton, toggleActiveClass, hideNotFoundDiv, showNotFoundDiv} from './helpers';
import { fetchCategories, fetchProducts, fetchModal,  fetchByCategory, fetchQuery  } from './products-api';
import { renderCategories, renderProducts, renderModal } from './render-function';
import { refs } from './refs.js';
import { openModal } from './modal.js';
import { addToWishlist, addToCart, isInCart, isInWishlist, removeFromCart, removeFromWishlist } from './storage.js';
import { ITEMS_PER_PAGE } from './constants.js';

let currentPage = 1;
let currentSearchQuery = "";
let selectedCategory = 'All';


export const getCategories = async () => {
  try {
    const data = await fetchCategories();
    
    renderCategories(data);

    activeFirstBtn();
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    currentPage = 1;
    const { products, total } = await fetchProducts(currentPage);

    renderProducts(products);

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    if (currentPage >= totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end.",
        position: "topRight",
      });
    } else {
      showLoadMoreButton();
    };

  } catch (error) {
    console.log(error);
  }
};

export const handleLoadMoreClick = async () => {
  if (selectedCategory !== 'All') return;
  currentPage++;
  hideLoadMoreButton();

  try {
    const { products, total } = await fetchProducts(currentPage);
    renderProducts(products);

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
      showLoadMoreButton();
    }

  } catch (error) {
    console.log(error);
  }
};

// Модальне вікно
export const handleProductsListItemClick = async (event) => {
  const card = event.target.closest(".products__item");
  const cardId = card.dataset.id;  
  
  try {
    const data = await fetchModal(cardId);
    openModal(cardId);
    renderModal(data);

  } catch (error) {
    console.log(error);
  }
};

//  Клік по категорії ===
export const handleCategoryClick = async e => {
  if (!e.target.classList.contains('categories__btn')) return;

  hideLoadMoreButton();
  clearProducts();
  currentPage = 1;

  try {
    const currentCategory = e.target.textContent;
    selectedCategory = currentCategory;
    const allCategoryBtn = document.querySelectorAll(".categories__btn");
    toggleActiveClass(allCategoryBtn, e.target, "categories__btn--active");
    let productsData;
    if (currentCategory === "All") {
      currentPage = 1;
      productsData = await fetchProducts(currentPage);
      showLoadMoreButton();
    } else {
      productsData = await fetchByCategory(currentCategory);
    };

    if (productsData.products.length > 0) {
      renderProducts(productsData.products);
      hideLoadMoreButton();

    if (currentCategory === 'All') {
        const totalPages = Math.ceil(productsData.total / ITEMS_PER_PAGE);
        if (currentPage < totalPages) showLoadMoreButton();
      }
    } else {
      showNotFoundDiv();
  }
  } catch (error) {
    console.log(error);
  }
};


// пошук продуктів за ключовим словом - Олексій
export const handleProductsByQuery = async (event) => { 
  event.preventDefault();
  const query = event.target.elements.searchValue.value.trim();
  
  if (!query) return;
  clearProducts();
  hideLoadMoreButton();
try {
    const { products } = await fetchQuery(query);
    
    if (products.length === 0) {
      showNotFoundDiv();
    } else {
      renderProducts(products);
      hideNotFoundDiv();
    };    
  } catch (error) {
console.log(error);
}
};

// очищення форми - Олексій
export const handleClearForm = () => {
  clearProducts();
  hideNotFoundDiv();
  refs.form.reset();
  getProducts();
};

// click add/remove to/from cart

export const addProductByIdToCart = () => {
  if (currentProductId === null) {
    return;
  }

  if (isInCart(currentProductId)) {
    removeFromCart(currentProductId);
  } else {
    addToCart(currentProductId);
  }

  updateCartBtnText();
  updateCartCounter();
};


// click buyBtn

export const buyBtnCart = () => {

  const cartData = JSON.parse(localStorage.getItem('cart'));
  if (!Array.isArray(cartData) || cartData.length === 0) {
    iziToast.warning({
      title: 'Oops!',
      message: 'Кошик порожній. Додайте товари перед покупкою.',
      position: 'topRight',
    });
    return;
  }
  iziToast.success({
    title: 'Success',
    message: 'You successfully bought all products in the cart!',
    position: 'topRight',
  });
  localStorage.removeItem('cart');
  clearProducts();
  updateCartSummary([]);
  updateCartTotal([]);
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

  
