import"./assets/styles-JE8YjOlG.js";import{a as o,i as c}from"./assets/vendor-4yCzdkXl.js";import{r as a,g as f,B as L,E as n,I as l,s as b,c as d,i as E,a as h,b as v,u as P}from"./assets/cart-CxdQWjzq.js";const T=()=>{const t=document.querySelector(".categories__btn");t&&t.classList.add("categories__btn--active")},B=t=>{document.querySelectorAll(".categories__btn").forEach(s=>s.classList.remove("categories__btn--active")),t.classList.add("categories__btn--active")},k=()=>{a.productsList.innerHTML=""},S=()=>{const t=document.querySelector(".nav__count");if(!t)return;const s=f();t.textContent=s.length};o.defaults.baseURL=L;const M=async()=>{const{data:t}=await o(`${n.CATEGORIES}`);return t},R=async t=>{const s=(t-1)*l,{data:r}=await o(`${n.PRODUCTS}?limit=${l}&skip=${s}`);return r},w=async t=>{const{data:s}=await o(`${n.PRODUCTS_BY_CATEGORY}/${t}`);return s},I=async t=>{const{data:s}=await o(`${n.PRODUCTS_BY_ID}/${t}`);return s},D=async(t,s)=>{const r=(s-1)*l,{data:e}=await o(`${n.PRODUCTS_BY_QUERY}?q=${t}&limit=${l}&skip=${r}`);return e},A=t=>{const s=t.map(r=>`<li class="categories__item">
   <button class="categories__btn" type="button">${r}</button>
 </li>`).join("");a.categoryList.innerHTML=s},g=t=>{const s=t.map(({id:r,thumbnail:e,title:i,brand:u,category:p,price:m})=>`
    <li class="products__item" data-id="${r}">
    <img class="products__image" src="${e}" alt="${i}"/>
    <p class="products__title">${i}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span>${u}</p>
    <p class="products__category">Category: ${p} </p>
    <p class="products__price">Price: $${m}</p>
 </li>
    `).join("");a.productsList.innerHTML=s},O=t=>{const{thumbnail:s,title:r,tags:e,description:i,shippingInformation:u,returnPolicy:p,price:m}=t,$=`
  <img class="modal-product__img" src="${s}" alt="${r}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${r}</p>
        <ul class="modal-product__tags">${e}</ul>
        <p class="modal-product__description">${i}</p>
        <p class="modal-product__shipping-information">Shipping:${u}</p>
        <p class="modal-product__return-policy">Return Policy:${p}</p>
        <p class="modal-product__price">Price:${m} $</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>
  `;a.modalContainer.innerHTML=$},_=document.querySelector(".modal"),U=t=>{console.log("🧩 Відкриваємо модалку з ID:",t),b(t),_&&_.classList.add("modal--is-open")},q=()=>{_.classList.remove("modal--is-open")};let y=1;const H=async()=>{try{const t=await M();A(["All",...t]),T()}catch(t){c.error({title:"Error",message:t.message})}},C=async()=>{try{const{products:t,total:s}=await R(y);g(t)}catch(t){c.error({title:"Error",message:t.message})}},Y=async t=>{const r=t.target.closest(".products__item").dataset.id;try{const e=await I(r);U(r),O(e)}catch(e){c.error({title:"Error",message:e.message})}},x=async t=>{if(!t.target.classList.contains("categories__btn"))return;const s=t.target.textContent;a.productsList.innerHTML="";try{const r=await w(s);g(r.products),B(t.target)}catch(r){c.error({title:"Error",message:r.message})}},F=async t=>{t.preventDefault();const s=t.target.elements.searchValue.value.trim();if(s)try{const{products:r}=await D(s,y);if(r.length===0)return console.log("ok"),k(),a.notFoundDiv.classList.add("not-found--visible");g(r)}catch(r){c.error({title:"Error",message:r.message})}},G=()=>{a.form.reset(),C()},Q=()=>{d!==null&&(E(d)?h(d):v(d),P(),S())};H();C();a.categoryList.addEventListener("click",x);a.productsList.addEventListener("click",Y);a.modalCloseBtn.addEventListener("click",q);a.form.addEventListener("submit",F);a.formBtnClear.addEventListener("click",G);a.addToCartBtn.addEventListener("click",Q);
//# sourceMappingURL=index.js.map
