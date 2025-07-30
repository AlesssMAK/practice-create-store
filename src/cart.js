//Логіка сторінки Cart

import * as helpers from './js/helpers';
import { refs } from './js/refs';
import { isInCart, } from './js/storage';

export let currentProductId = null;

export const setCurrentProduct = productId => {
    currentProductId = productId;
  updateCartBtnText();

}

export const updateCartBtnText = () => {
    if(currentProductId === null) return;

    if(isInCart(currentProductId)) {
        refs.addToCartBtn.textContent = 'Remove from Cart'; 
    } else {
        refs.addToCartBtn.textContent = 'Add to Cart' 
    }
};


