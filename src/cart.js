//Логіка сторінки Cart

import { buyBtnCart, handleProductsListItemClick } from './js/handlers';
import * as helpers from './js/helpers';
import { fetchProductsByIds } from './js/products-api';
import { updateWishlistBtnText } from './js/helpers';
import { refs } from './js/refs';
import { renderProducts } from './js/render-function';
import { getCart, isInCart, } from './js/storage';

export let currentProductId = null;
export const cartData = "ids";

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

export const loadCartProducts = async () => {
     const cartData = getCart();
    if(!cartData.length) return;
 
    try {
        const products = await fetchProductsByIds(cartData);
        renderProducts(products);
        helpers.updateCartSummary(products);
        helpers.updateCartTotal(products);
    } catch (error) {
        console.error("Помилка завантаження товарів:", error)
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if(refs.buyBtn) {
        refs.buyBtn.addEventListener('click', buyBtnCart);
    }
    loadCartProducts();
})

document.addEventListener('DOMContentLoaded', () => {
    if (refs.productsList) {
        refs.productsList.addEventListener('click', handleProductsListItemClick);
      }     
})








