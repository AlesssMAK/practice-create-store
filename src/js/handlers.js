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
  hasMore,
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
let currentSearchQuery = '';

export const getCategories = async () => {
  try {
    showLoader();
    const data = await fetchCategories();

    renderCategories(data);

    activeFirstBtn();
  } catch (error) {
    iziToast.error({
      title: 'error',
      message: 'No response from server. Please try again.',
      position: 'topRight',
    });
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
    showNotFoundDiv();
    iziToast.error({
      title: 'error',
      message: 'No response from server. Please try again.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
};

export const handleLoadMoreClick = async () => {
  currentPage++;
  showLoader();
  hideLoadMoreButton();

  try {
    let data;

    if (currentSearchQuery) {
      data = await fetchQuery(currentSearchQuery, currentPage);
    } else if (selectedCategory !== 'All') {
      data = await fetchByCategory(selectedCategory, currentPage);
    } else {
      data = await fetchProducts(currentPage);
    }

    const { products = [], total } = data || {};

    if (products.length) {
      renderProducts(products);

      if (hasMore(total, products, currentPage, ITEMS_PER_PAGE)) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
        if (currentPage > 1) {
          iziToast.info({
            message: 'All items have been loaded.',
            position: 'topRight',
          });
        }
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'No response from server. Please try again.',
      position: 'topRight',
    });
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
    iziToast.error({
      title: 'error',
      message: 'No response from server. Please try again.',
      position: 'topRight',
    });
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
  hideNotFoundDiv();

  currentPage = 1;
  currentSearchQuery = '';

  try {
    const currentCategory = e.target.textContent.trim();
    selectedCategory = currentCategory;

    const allCategoryBtn = document.querySelectorAll('.categories__btn');
    toggleActiveClass(allCategoryBtn, e.target, 'categories__btn--active');

    const data =
      currentCategory === 'All'
        ? await fetchProducts(currentPage)
        : await fetchByCategory(currentCategory, currentPage);

    const { products = [], total } = data || {};

    if (products.length > 0) {
      renderProducts(products);

      if (hasMore(total, products, currentPage, ITEMS_PER_PAGE)) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
      }
    } else {
      clearActiveCategoryBtn();
      showNotFoundDiv();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'No response from server. Please try again.',
      position: 'topRight',
    });
    clearActiveCategoryBtn();
    showNotFoundDiv();
    console.log(error);
  } finally {
    hideLoader();
  }
};

// пошук продуктів за ключовим словом - Олексій
export const handleProductsByQuery = async event => {
  event.preventDefault();

  const form = event.currentTarget || event.target;
  const query = form.elements.searchValue.value.trim();

  currentPage = 1;
  currentSearchQuery = query;
  selectedCategory = 'All';

  if (!query) {
    clearActiveCategoryBtn();
    hideLoadMoreButton();
    return;
  }

  clearProducts();
  hideNotFoundDiv();
  hideLoadMoreButton();

  try {
    showLoader();

    const { products, total } = await fetchQuery(query, currentPage);

    if (products.length === 0) {
      showNotFoundDiv();
      return;
    }

    renderProducts(products);
    hideNotFoundDiv();

    if (hasMore(total, products, currentPage, ITEMS_PER_PAGE)) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'No response from server. Please try again.',
      position: 'topRight',
    });
    showNotFoundDiv();
  } finally {
    hideLoader();
    clearActiveCategoryBtn();
  }
};

// очищення форми - Олексій
export const handleClearForm = () => {
  currentPage = 1;
  currentSearchQuery = '';
  selectedCategory = 'All';
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
    iziToast.warning({
      title: '!',
      message: 'Product successfully removed from cart',
      position: 'topRight',
    });
    if (isCartPage()) {
      loadCartProducts();
    }
  } else {
    addToCart(currentProductId);
    iziToast.success({
      title: 'Success',
      message: 'Product successfully added to cart!',
      position: 'topRight',
    });
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
    iziToast.warning({
      title: '!',
      message: 'Product successfully removed from wishlist',
      position: 'topRight',
    });
    if (isWishlistPage()) {
      LoadWishListProducts();
    }
  } else {
    addToWishlist(currentProductId);
    iziToast.success({
      title: 'Success',
      message: 'Product successfully added to wishlist!',
      position: 'topRight',
    });
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
