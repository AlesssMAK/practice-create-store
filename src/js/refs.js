import { addToWishlist } from "./storage";

export const refs = {
  categoryList: document.querySelector('.categories'),
  productsList: document.querySelector('ul.products'),     
  notFoundDiv: document.querySelector('.not-found'),
  modalContainer: document.querySelector('.modal-product'),
  modalCloseBtn: document.querySelector(".modal__close-btn"),
  form: document.querySelector(".search-form"),
  formBtnClear: document.querySelector(".search-form__btn-clear"),
  modal: document.querySelector('.modal'),
  addToCartBtn: document.querySelector('.modal-product__btn--cart'),
  navCounter: document.querySelector('.nav__count'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  countCartItem: document.querySelector('[data-count]'),
  priceCartTotal: document.querySelector('[data-price]'),
  buyBtn: document.querySelector('.cart-summary__btn'),
  addToWishlistBtn: document.querySelector('.modal-product__btn--wishlist')
};
