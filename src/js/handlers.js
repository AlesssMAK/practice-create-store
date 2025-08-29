import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  currentProductId,
  updateCartBtnText,
  activeFirstBtn,
  clearProducts,
  updateCartCounter,
  updateCartSummary,
  updateCartTotal,
  updateWishlistCounter,
  updateWishlistBtnText,
  showLoadMoreButton,
  hideLoadMoreButton,
  toggleActiveClass,
  hideNotFoundDiv,
  showNotFoundDiv,
  isWishlistPage,
  isCartPage,
  hideLoader,
  showLoader,
  clearActiveCategoryBtn,
} from './helpers';
import {
  fetchCategories,
  fetchProducts,
  fetchModal,
  fetchByCategory,
  fetchQuery,
  fetchProductsByIds,
} from './products-api';
import {
  renderCategories,
  renderProducts,
  renderModal,
} from './render-function';
import { refs } from './refs.js';
import { closeModal, openModal } from './modal.js';
import {
  addToWishlist,
  addToCart,
  isInCart,
  isInWishlist,
  removeFromCart,
  removeFromWishlist,
  getWishlist,
  getCart,
} from './storage.js';
import { ITEMS_PER_PAGE } from './constants.js';

let currentPage = 1;
let selectedCategory = 'All';

export const getCategories = async () => {
  try {
    showLoader();
    const data = await fetchCategories();

    renderCategories(data);

    activeFirstBtn();
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

export const getProducts = async () => {
  try {
    showLoader();
    currentPage = 1;
    const { products, total } = await fetchProducts(currentPage);

    renderProducts(products);

    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    if (currentPage >= totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

export const handleLoadMoreClick = async () => {
  currentPage++;
  showLoader();
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
  } finally {
    hideLoader();
  }
};

// Модальне вікно
export const handleProductsListItemClick = async event => {
  const card = event.target.closest('.products__item');
  const cardId = card.dataset.id;

  try {
    const data = await fetchModal(cardId);
    openModal(cardId);
    renderModal(data);
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

//  Клік по категорії ===
export const handleCategoryClick = async e => {
  if (!e.target.classList.contains('categories__btn')) return;

  showLoader();
  hideLoadMoreButton();
  clearProducts();
  currentPage = 1;

  try {
    const currentCategory = e.target.textContent;
    selectedCategory = currentCategory;
    const allCategoryBtn = document.querySelectorAll('.categories__btn');
    toggleActiveClass(allCategoryBtn, e.target, 'categories__btn--active');
    let productsData;
    if (currentCategory === 'All') {
      currentPage = 1;
      productsData = await fetchProducts(currentPage);
      showLoadMoreButton();
    } else {
      productsData = await fetchByCategory(currentCategory);
    }

    if (productsData.products.length > 0) {
      renderProducts(productsData.products);
      hideLoadMoreButton();
      hideNotFoundDiv();

      if (currentCategory === 'All') {
        const totalPages = Math.ceil(productsData.total / ITEMS_PER_PAGE);
        if (currentPage < totalPages) showLoadMoreButton();
      }
    } else {
      showNotFoundDiv();
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

// пошук продуктів за ключовим словом - Олексій
export const handleProductsByQuery = async event => {
  event.preventDefault();
  const query = event.target.elements.searchValue.value.trim();

  if (!query) return;
  clearProducts();
  hideLoadMoreButton();
  try {
    showLoader();
    const { products } = await fetchQuery(query);

    if (products.length === 0) {
      showNotFoundDiv();
    } else {
      renderProducts(products);
      hideNotFoundDiv();
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
    clearActiveCategoryBtn();
  }
};

// очищення форми - Олексій
export const handleClearForm = () => {
  clearProducts();
  hideNotFoundDiv();
  refs.form.reset();
  hideLoadMoreButton();
  clearActiveCategoryBtn();
  activeFirstBtn();
  getProducts();
};

/*----------------------------Cart----------------------------*/

export const loadCartProducts = async () => {
  const cartListItems = getCart();

  if (!cartListItems.length) {
    refs.productsList.innerHTML = '';
    showNotFoundDiv();
    updateCartSummary([]);
    updateCartTotal([]);
    return;
  }
  showLoader();
  const products = await fetchProductsByIds(cartListItems);

  refs.productsList.innerHTML = '';
  renderProducts(products);
  updateCartSummary(products);
  updateCartTotal(products);
  hideNotFoundDiv();
  hideLoader();
};

export const closeModalCartlist = () => {
  closeModal();
};

/*----------------------------Whishlist----------------------------*/

// click add/remove to/from cart

export const addProductByIdToCart = () => {
  if (currentProductId === null) {
    return;
  }

  if (isInCart(currentProductId)) {
    removeFromCart(currentProductId);
    if (isCartPage()) {
      loadCartProducts();
    }
  } else {
    addToCart(currentProductId);
    if (isCartPage()) {
      loadCartProducts();
    }
  }
  hideLoader();
  updateCartBtnText();
  updateCartCounter();
};

export const LoadWishListProducts = async () => {
  const wishlistItems = getWishlist();

  if (wishlistItems.length === 0) {
    hideLoader();
    refs.productsList.innerHTML = '';
    showNotFoundDiv();
    return;
  }

  showLoader();
  const wishlistProducts = await fetchProductsByIds(wishlistItems);
  refs.productsList.innerHTML = '';
  renderProducts(wishlistProducts);
  hideLoader();
};

//Iryna Wishlist click handler

export const addProductByIdToWishlist = () => {
  if (currentProductId === null) {
    return;
  }

  if (isInWishlist(currentProductId)) {
    removeFromWishlist(currentProductId);
    if (isWishlistPage()) {
      LoadWishListProducts();
    }
  } else {
    addToWishlist(currentProductId);
    if (isWishlistPage()) {
      LoadWishListProducts();
    }
    hideNotFoundDiv();
  }
  hideLoader();
  updateWishlistBtnText(currentProductId);
  updateWishlistCounter();
};

export const closeModalWishlist = () => {
  closeModal();
};
