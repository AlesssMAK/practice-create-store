import { refs } from './refs';
import { getCart, getWishlist } from './storage';

export const activeFirstBtn = () => {
  const firstBtn = document.querySelector('.categories__btn');
  if (firstBtn) {
    firstBtn.classList.add('categories__btn--active');
  }
  //   [...refs.categoryList.children].forEach(li => {
  //     const activeBtn = li.firstElementChild;
  //     if (activeBtn.textContent.toLowerCase() === 'all') {
  //       activeBtn.classList.add('categories__btn--active');
  //     }
  //   });
};
// 6. Підсвітка активної категорії ===

export const highlightActiveCategory = (activeButton) => {
  document.querySelectorAll('.categories__btn').forEach(btn => btn.classList.remove('categories__btn--active'));
  activeButton.classList.add('categories__btn--active');
};

export const clearProducts = () => {
  refs.productsList.innerHTML = "";
}

// cart product counter

export const updateCartCounter = () => {
  const counter = document.querySelector('.nav__count');
  if (!counter) {
    return;
  }
  const cart = getCart();
  counter.textContent = cart.length;
}

//wishlist 
export const updateWishlistCounter = () => {
  const counter = document.querySelector('.wishlist-items-count');
  if (!counter) {
    return;
  }
  
  const wishlist = getWishlist();
  counter.textContent = wishlist.length;
}