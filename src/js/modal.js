import { refs } from "./refs";

const handleEscPress = (event) => {
    
    if (event.code === "Escape") {
        closeModal();
    }
}

const handleBackdropClick = (event) => {
    if (event.target === refs.modal) {
        closeModal();
    }
}
export const openModal = () => {
    refs.modal.classList.add('modal--is-open');
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscPress);
    refs.modal.addEventListener("click", handleBackdropClick);
};

export const closeModal = () => {
    refs.modal.classList.remove('modal--is-open');
    document.body.style.overflow = "";
    window.removeEventListener("keydown", handleEscPress);
    refs.modal.removeEventListener("click", handleBackdropClick);
};




