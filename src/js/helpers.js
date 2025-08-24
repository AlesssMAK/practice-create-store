
import { refs } from './refs';
import { getCart, getWishlist, isInWishlist, isInCart } from './storage';

export let currentProductId = null;

export const setCurrentProduct = productId => {
    currentProductId = productId;
  updateCartBtnText();
  updateWishlistBtnText(currentProductId);
}

export const updateCartBtnText = () => {
    if(currentProductId === null) return;

    if(isInCart(currentProductId)) {
        refs.addToCartBtn.textContent = 'Remove from Cart'; 
    } else {
        refs.addToCartBtn.textContent = 'Add to Cart' 
    }
};

export const activeFirstBtn = () => {
  const firstBtn = document.querySelector('.categories__btn');
  if (firstBtn) {
    firstBtn.classList.add('categories__btn--active');
  }
};

export const toggleActiveClass = (elements, activeElement, activeClass) => {
  elements.forEach(element => {
    element.classList.remove(activeClass);
  });
  activeElement.classList.add(activeClass);
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
};


export const updateCartSummary = products => {
  if(!Array.isArray(products)) return;
  if (!refs.countCartItem) return;
  refs.countCartItem.textContent = products.length;
};

export const updateCartTotal = (products) => {
  if(!Array.isArray(products)) return;
  if(!refs.priceCartTotal) return;
  const total = products.reduce((sum, product) => sum + product.price, 0);
  refs.priceCartTotal.textContent = `$${total.toFixed(2)}`;
  };

//wishlist 
export const updateWishlistCounter = () => {
  const counter = document.querySelector('.wishlist-items-count');
  if (!counter) {
    return;
  }
  
  const wishlist = getWishlist();
  counter.textContent = wishlist.length;
};

export const updateWishlistBtnText = (id) => {
  if(isInWishlist(id)) {
    refs.addToWishlistBtn.textContent = 'Remove from Wishlist'
  } else {
    refs.addToWishlistBtn.textContent = 'Add to Wishlist'
  }
};

export const isWishlistPage = () => window.location.pathname.includes('wishlist'); 
export const isCartPage = () => window.location.pathname.includes('cart'); 

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
