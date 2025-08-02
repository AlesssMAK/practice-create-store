import { CART_KEY, WISHLIST_KEY } from "./constants"

export const getCart = () => {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

export const saveCart = cart => {
    return localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export const addToCart = id => {
    const cart = getCart();
    if(!cart.includes(id)) {
        cart.push(id);
        saveCart(cart);
    }
}

export const removeFromCart = id => {
    const updateCart = getCart().filter(itemId => itemId !== id);
    saveCart(updateCart);
}

export const isInCart = id => getCart().includes(id); 

// Iryna M.
// /for wishlist

export const getWishlist = () => {
    // повертаємо массив ID продуктів
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
}

export const saveWishlist = wishlistIds => {
    return localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistIds));
}

export const addToWishlist = id => {
    console.log('Додаємо до wishlist:', id);
    const wishlistIds = getWishlist();
    if(!wishlistIds.includes(id)) {
        wishlistIds.push(id);
        saveWishlist(wishlistIds);
    }
}

export const removeFromWishlist = id => {
    const updateedWishlistArray = getWishlist().filter(itemId => itemId !== id);
     saveWishlist(updateedWishlistArray);
}

export const isInWishlist = id => getWishlist().includes(id); 