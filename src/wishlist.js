//Логіка сторінки Wishlist
import * as helpers from './js/helpers';
import { refs } from './js/refs';
import { isInWishlist, } from './js/storage';
import { currentProductId } from './cart';


export const updateWishlistBtnText = () => {
    if(currentProductId === null) return;

    if(isInWishlist(currentProductId)) {
        refs.addToWishlistBtn.textContent = 'Remove from Wishlist'; 
    } else {
        refs.addToWishlistBtn.textContent = 'Add to Wishlist' 
    }
};
