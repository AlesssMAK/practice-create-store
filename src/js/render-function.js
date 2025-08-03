import { refs } from './refs';

export const renderCategories = data => {
    const allData = ['All', ...data];
  const markup = allData
    .map(
      el => `<li class="categories__item">
   <button class="categories__btn" type="button">${el}</button>
 </li>`
    )
    .join('');

  refs.categoryList.innerHTML = markup;
};

export const renderProducts = (products) => {
  const markup = products.map(({ id, thumbnail, title, brand, category, price }) => `
    <li class="products__item" data-id="${id}">
    <img class="products__image" src="${thumbnail}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span>${brand}</p>
    <p class="products__category">Category: ${category} </p>
    <p class="products__price">Price: $${price}</p>
 </li>
    `).join("");

  refs.productsList.insertAdjacentHTML("beforeend", markup);
};

 export const renderEmptyMessage = (container, message) => {
   container.innerHTML = `<p class="empty-message">${message}</p>`;
 };

export const renderModal = (modal) => {

  const { thumbnail, title, tags, description, shippingInformation, returnPolicy, price } = modal;
  const markup = `
  <img class="modal-product__img" src="${thumbnail}" alt="${title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${title}</p>
        <ul class="modal-product__tags">${tags}</ul>
        <p class="modal-product__description">${description}</p>
        <p class="modal-product__shipping-information">Shipping:${shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy:${returnPolicy}</p>
        <p class="modal-product__price">Price:${price} $</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>
  `;

  refs.modalContainer.innerHTML = markup;
};



