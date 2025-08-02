import { CART_KEY } from "./constants"

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