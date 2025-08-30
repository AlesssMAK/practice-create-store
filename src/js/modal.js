import { refs } from './refs';
import { hideLoader, setCurrentProduct } from './helpers';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const handleEscPress = event => {
  if (event.code === 'Escape') {
    closeModal();
  }
};

const handleBackdropClick = event => {
  if (event.target === refs.modal) {
    closeModal();
  }
};

export const openModal = productId => {
  hideLoader();
  refs.modal.classList.add('modal--is-open');
  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', handleEscPress);
  refs.modal.addEventListener('click', handleBackdropClick);
  setCurrentProduct(productId);
};

export const closeModal = () => {
  refs.modal.classList.remove('modal--is-open');
  document.body.style.overflow = '';
  window.removeEventListener('keydown', handleEscPress);
  refs.modal.removeEventListener('click', handleBackdropClick);
};
