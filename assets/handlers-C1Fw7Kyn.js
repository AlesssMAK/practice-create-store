import{a as e,i as d}from"./vendor-Cbhu4xvy.js";import{B as $,E as n,I as l,r as i,s as f,a as C,h as P,c as T,b as o,i as b,d as E,e as B,f as I,j as L,k as R,l as S,m as w,n as k,u as v}from"./cart-Ci43MO2Z.js";e.defaults.baseURL=$;const D=async()=>{const{data:t}=await e(`${n.CATEGORIES}`);return t},M=async t=>{const s=(t-1)*l,{data:r}=await e(`${n.PRODUCTS}?limit=${l}&skip=${s}`);return r},O=async t=>{const{data:s}=await e(`${n.PRODUCTS_BY_CATEGORY}/${t}`);return s},U=async t=>{const{data:s}=await e(`${n.PRODUCTS_BY_ID}/${t}`);return s},q=async t=>{try{const{data:s}=await e(`${n.PRODUCTS}?limit=0`);return s.products.filter(c=>t.includes(String(c.id)))}catch(s){return console.error("Error fetching products:",s),[]}},A=async(t,s)=>{const r=(s-1)*l,{data:a}=await e(`${n.PRODUCTS_BY_QUERY}?q=${t}&limit=${l}&skip=${r}`);return a},W=t=>{const s=t.map(r=>`<li class="categories__item">
   <button class="categories__btn" type="button">${r}</button>
 </li>`).join("");i.categoryList.innerHTML=s},_=t=>{const s=t.map(({id:r,thumbnail:a,title:c,brand:u,category:p,price:m})=>`
    <li class="products__item" data-id="${r}">
    <img class="products__image" src="${a}" alt="${c}"/>
    <p class="products__title">${c}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span>${u}</p>
    <p class="products__category">Category: ${p} </p>
    <p class="products__price">Price: $${m}</p>
 </li>
    `).join("");i.productsList.innerHTML=s},x=t=>{const{thumbnail:s,title:r,tags:a,description:c,shippingInformation:u,returnPolicy:p,price:m}=t,h=`
  <img class="modal-product__img" src="${s}" alt="${r}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${r}</p>
        <ul class="modal-product__tags">${a}</ul>
        <p class="modal-product__description">${c}</p>
        <p class="modal-product__shipping-information">Shipping:${u}</p>
        <p class="modal-product__return-policy">Return Policy:${p}</p>
        <p class="modal-product__price">Price:${m} $</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>
  `;i.modalContainer.innerHTML=h},g=document.querySelector(".modal"),F=t=>{console.log("🧩 Відкриваємо модалку з ID:",t),f(t),g&&g.classList.add("modal--is-open")},G=()=>{g.classList.remove("modal--is-open")};let y=1;const Q=async()=>{try{const t=await D();W(["All",...t]),C()}catch(t){d.error({title:"Error",message:t.message})}},Y=async()=>{try{const{products:t,total:s}=await M(y);_(t)}catch(t){d.error({title:"Error",message:t.message})}},N=async t=>{const r=t.target.closest(".products__item").dataset.id;try{const a=await U(r);F(r),x(a)}catch(a){d.error({title:"Error",message:a.message})}},z=async t=>{if(!t.target.classList.contains("categories__btn"))return;const s=t.target.textContent;i.productsList.innerHTML="";try{const r=await O(s);_(r.products),P(t.target)}catch(r){d.error({title:"Error",message:r.message})}},V=async t=>{t.preventDefault();const s=t.target.elements.searchValue.value.trim();if(s)try{const{products:r}=await A(s,y);if(r.length===0)return console.log("ok"),T(),i.notFoundDiv.classList.add("not-found--visible");_(r)}catch(r){d.error({title:"Error",message:r.message})}},J=()=>{i.form.reset(),Y()},K=()=>{o!==null&&(b(o)?E(o):B(o),I(),L())},X=()=>{o!==null&&(R(o)?S(o):w(o),k(o),v())};export{K as a,X as b,G as c,Q as d,Y as e,q as f,N as g,z as h,V as i,J as j,_ as r};
//# sourceMappingURL=handlers-C1Fw7Kyn.js.map
