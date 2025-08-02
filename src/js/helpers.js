
import { getProducts } from './handlers';
import { refs } from './refs';
import { getCart, getWishlist, isInWishlist } from './storage';

export const activeFirstBtn = () => {
  const firstBtn = document.querySelector('.categories__btn');
  if (firstBtn) {
    firstBtn.classList.add('categories__btn--active');
    // firstBtn.addEventListener("click", () => {
    //   getProducts();
    // });
  }
  //   [...refs.categoryList.children].forEach(li => {
  //     const activeBtn = li.firstElementChild;
  //     if (activeBtn.textContent.toLowerCase() === 'all') {
  //       activeBtn.classList.add('categories__btn--active');
  //     }
  //   });
};
// 6. Підсвітка активної категорії ===

export const toggleActiveClass = (elements, activeElement, activeClass) => {
  elements.forEach(element => {
    element.classList.remove(activeClass);
  });

  activeElement.classList.add(activeClass);
 };

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

export const updateWishlistBtnText = (id) => {
  if(isInWishlist(id)) {
    refs.addToWishlistBtn.textContent = 'Remove from Wishlist'
  } else {
    refs.addToWishlistBtn.textContent = 'Add to Wishlist'
  }
}


export const showLoadMoreButton = () => {
    refs.loadMoreBtn.classList.remove("is-hidden");
};

export const hideLoadMoreButton = () => {
    refs.loadMoreBtn.classList.add("is-hidden");
};

export const showNotFoundDiv = () => { 
  refs.notFoundDiv.classList.add("not-found--visible");
};

export const hideNotFoundDiv = () => { 
  refs.notFoundDiv.classList.remove("not-found--visible");
};