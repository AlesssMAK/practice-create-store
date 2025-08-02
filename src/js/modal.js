import { setCurrentProduct } from "../cart";

const modalEl = document.querySelector('.modal');

export const openModal = productId => {  
    setCurrentProduct(productId);

    if (modalEl) {
        modalEl.classList.add('modal--is-open');
    };
};

export const closeModal = () => {
    modalEl.classList.remove('modal--is-open');
}


