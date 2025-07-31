import{a as c,i as d}from"./vendor-Cbhu4xvy.js";import{B as C,E as i,I as l,r as a,s as P,a as E,h as b,c as T,b as o,i as w,d as v,e as L,f as k,j as B,k as I,l as R,m as S,n as D,u as M}from"./cart-DR70ZrKf.js";c.defaults.baseURL=C;const O=async()=>{const{data:t}=await c(`${i.CATEGORIES}`);return t},U=async t=>{const s=(t-1)*l,{data:r}=await c(`${i.PRODUCTS}?limit=${l}&skip=${s}`);return r},A=async t=>{const{data:s}=await c(`${i.PRODUCTS_BY_CATEGORY}/${t}`);return s},W=async t=>{const{data:s}=await c(`${i.PRODUCTS_BY_ID}/${t}`);return s},q=async t=>{try{const{data:s}=await c(`${i.PRODUCTS}?limit=0`);return s.products.filter(n=>t.includes(String(n.id)))}catch(s){return console.error("Error fetching products:",s),[]}},x=async(t,s)=>{const r=(s-1)*l,{data:e}=await c(`${i.PRODUCTS_BY_QUERY}?q=${t}&limit=${l}&skip=${r}`);return e},F=t=>{const s=t.map(r=>`<li class="categories__item">
   <button class="categories__btn" type="button">${r}</button>
 </li>`).join("");a.categoryList.innerHTML=s},g=t=>{const s=t.map(({id:r,thumbnail:e,title:n,brand:u,category:p,price:m})=>`
    <li class="products__item" data-id="${r}">
    <img class="products__image" src="${e}" alt="${n}"/>
    <p class="products__title">${n}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span>${u}</p>
    <p class="products__category">Category: ${p} </p>
    <p class="products__price">Price: $${m}</p>
 </li>
    `).join("");a.productsList.innerHTML=s},Y=t=>{const{thumbnail:s,title:r,tags:e,description:n,shippingInformation:u,returnPolicy:p,price:m}=t,$=`
  <img class="modal-product__img" src="${s}" alt="${r}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${r}</p>
        <ul class="modal-product__tags">${e}</ul>
        <p class="modal-product__description">${n}</p>
        <p class="modal-product__shipping-information">Shipping:${u}</p>
        <p class="modal-product__return-policy">Return Policy:${p}</p>
        <p class="modal-product__price">Price:${m} $</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>
  `;a.modalContainer.innerHTML=$},_=t=>{t.code==="Escape"&&h()},y=t=>{t.target===a.modal&&h()},j=t=>{a.modal.classList.add("modal--is-open"),document.body.style.overflow="hidden",window.addEventListener("keydown",_),a.modal.addEventListener("click",y),P(t)},h=()=>{a.modal.classList.remove("modal--is-open"),document.body.style.overflow="",window.removeEventListener("keydown",_),a.modal.removeEventListener("click",y)};let f=1;const N=async()=>{try{const t=await O();F(["All",...t]),E()}catch(t){d.error({title:"Error",message:t.message})}},H=async()=>{try{const{products:t,total:s}=await U(f);g(t)}catch(t){d.error({title:"Error",message:t.message})}},z=async t=>{const r=t.target.closest(".products__item").dataset.id;try{const e=await W(r);j(r),Y(e)}catch(e){d.error({title:"Error",message:e.message})}},V=async t=>{if(!t.target.classList.contains("categories__btn"))return;const s=t.target.textContent;a.productsList.innerHTML="";try{const r=await A(s);g(r.products),b(t.target)}catch(r){d.error({title:"Error",message:r.message})}},J=async t=>{t.preventDefault();const s=t.target.elements.searchValue.value.trim();if(s)try{const{products:r}=await x(s,f);if(r.length===0)return T(),a.notFoundDiv.classList.add("not-found--visible");g(r)}catch(r){d.error({title:"Error",message:r.message})}},K=()=>{a.form.reset(),H()},X=()=>{o!==null&&(w(o)?v(o):L(o),k(),B())},Z=()=>{o!==null&&(I(o)?R(o):S(o),D(o),M())};export{X as a,Z as b,h as c,H as d,V as e,q as f,N as g,z as h,J as i,K as j,g as r};
//# sourceMappingURL=handlers-B-1Kc88h.js.map
