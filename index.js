import"./assets/styles-JE8YjOlG.js";import{a as c,i as a}from"./assets/vendor-4yCzdkXl.js";const r={categoryList:document.querySelector(".categories"),productsList:document.querySelector("ul.products"),notFoundDiv:document.querySelector(".not-found"),modalContainer:document.querySelector(".modal-product"),modalCloseBtn:document.querySelector(".modal__close-btn"),form:document.querySelector(".search-form"),formBtnClear:document.querySelector(".search-form__btn-clear")},C=()=>{const t=document.querySelector(".categories__btn");t&&t.classList.add("categories__btn--active")},f=t=>{document.querySelectorAll(".categories__btn").forEach(e=>e.classList.remove("categories__btn--active")),t.classList.add("categories__btn--active")},L=()=>{r.productsList.innerHTML=""},h="https://dummyjson.com/",n={CATEGORIES:"products/category-list",PRODUCTS:"products",PRODUCTS_BY_ID:"products",PRODUCTS_BY_CATEGORY:"products/category",PRODUCTS_BY_QUERY:"products/search"},d=12;c.defaults.baseURL=h;const E=async()=>{const{data:t}=await c(`${n.CATEGORIES}`);return t},b=async t=>{const e=(t-1)*d,{data:s}=await c(`${n.PRODUCTS}?limit=${d}&skip=${e}`);return s},S=async t=>{const{data:e}=await c(`${n.PRODUCTS_BY_CATEGORY}/${t}`);return e},P=async t=>{const{data:e}=await c(`${n.PRODUCTS_BY_ID}/${t}`);return e},T=async(t,e)=>{const s=(e-1)*d,{data:o}=await c(`${n.PRODUCTS_BY_QUERY}?q=${t}&limit=${d}&skip=${s}`);return o},v=t=>{const e=t.map(s=>`<li class="categories__item">
   <button class="categories__btn" type="button">${s}</button>
 </li>`).join("");r.categoryList.innerHTML=e},_=t=>{const e=t.map(({id:s,thumbnail:o,title:i,brand:l,category:u,price:p})=>`
    <li class="products__item" data-id="${s}">
    <img class="products__image" src="${o}" alt="${i}"/>
    <p class="products__title">${i}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span>${l}</p>
    <p class="products__category">Category: ${u} </p>
    <p class="products__price">Price: $${p}</p>
 </li>
    `).join("");r.productsList.innerHTML=e},R=t=>{const{thumbnail:e,title:s,tags:o,description:i,shippingInformation:l,returnPolicy:u,price:p}=t,$=`
  <img class="modal-product__img" src="${e}" alt="${s}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${s}</p>
        <ul class="modal-product__tags">${o}</ul>
        <p class="modal-product__description">${i}</p>
        <p class="modal-product__shipping-information">Shipping:${l}</p>
        <p class="modal-product__return-policy">Return Policy:${u}</p>
        <p class="modal-product__price">Price:${p} $</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>
  `;r.modalContainer.innerHTML=$},m=document.querySelector(".modal"),B=()=>{m&&m.classList.add("modal--is-open")},D=()=>{m.classList.remove("modal--is-open")};let g=1;const k=async()=>{try{const t=await E();v(["All",...t]),C()}catch(t){a.error({title:"Error",message:t.message})}},y=async()=>{try{const{products:t,total:e}=await b(g);_(t)}catch(t){a.error({title:"Error",message:t.message})}},O=async t=>{const s=t.target.closest(".products__item").dataset.id;try{const o=await P(s);B(),R(o)}catch(o){a.error({title:"Error",message:o.message})}},q=async t=>{if(!t.target.classList.contains("categories__btn"))return;const e=t.target.textContent;r.productsList.innerHTML="";try{const s=await S(e);_(s.products),f(t.target)}catch(s){a.error({title:"Error",message:s.message})}},U=async t=>{t.preventDefault();const e=t.target.elements.searchValue.value.trim();if(e)try{const{products:s}=await T(e,g);if(s.length===0)return console.log("ok"),L(),r.notFoundDiv.classList.add("not-found--visible");_(s)}catch(s){a.error({title:"Error",message:s.message})}},M=()=>{r.form.reset(),y()};k();y();r.categoryList.addEventListener("click",q);r.productsList.addEventListener("click",O);r.modalCloseBtn.addEventListener("click",D);r.form.addEventListener("submit",U);r.formBtnClear.addEventListener("click",M);
//# sourceMappingURL=index.js.map
