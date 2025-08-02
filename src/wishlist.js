//Логіка сторінки Wishlist
import {updateWishlistCounter }  from './js/helpers';
import { refs } from './js/refs';
import { isInWishlist, getWishlist } from './js/storage';
import { fetchProductsByIds } from './js/products-api';
import { renderProducts, renderEmptyMessage } from './js/render-function';
import { handleProductsListItemClick, addProductByIdToWishlist, addProductByIdToCart } from './js/handlers';
import { closeModal } from './js/modal';


const LoadWishListProducts = async () => {
    const wishlistItems = getWishlist();

    if (wishlistItems.length === 0) {
        renderEmptyMessage(refs.productsList, 'Your wishlist is empty.');
        return; 
    } 

    const wishlistProducts = await fetchProductsByIds(wishlistItems);
    renderProducts(wishlistProducts);

}
const closeModalWishlist = () => {
    closeModal();
    LoadWishListProducts();
}
 
LoadWishListProducts();
refs.productsList.addEventListener("click", handleProductsListItemClick);
refs.modalCloseBtn.addEventListener("click", closeModalWishlist);
refs.addToCartBtn.addEventListener('click', addProductByIdToCart);
refs.addToWishlistBtn.addEventListener('click', addProductByIdToWishlist);
updateWishlistCounter();
