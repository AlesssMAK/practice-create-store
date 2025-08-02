import axios from 'axios';
import { BASE_URL, ENDPOINTS, ITEMS_PER_PAGE } from './constants';

axios.defaults.baseURL = BASE_URL;

export const fetchCategories = async () => {
  const { data } = await axios(`${ENDPOINTS.CATEGORIES}`);
  return data;
};

export const fetchProducts = async page => {
  const skip = (page - 1) * ITEMS_PER_PAGE;
  const { data } = await axios(
    `${ENDPOINTS.PRODUCTS}?limit=${ITEMS_PER_PAGE}&skip=${skip}`
  );
  return data;
};

export const fetchByCategory = async category => {
  const { data } = await axios(`${ENDPOINTS.PRODUCTS_BY_CATEGORY}/${category}`);
  return data;
};


// Функція повертає один продукт по його ID
export const fetchModal = async (id) => {
  const { data } = await axios(`${ENDPOINTS.PRODUCTS_BY_ID}/${id}`);
  return data;
};


// функція повертає массив продуктів за заданими ID
export const fetchProductsByIds = async (Ids) => {
  try {
    const { data } = await axios(`${ENDPOINTS.PRODUCTS}?limit=0`);
    const allProducts = data;
    const filteredProducts = allProducts.products.filter(product => Ids.includes(String(product.id)));
    return filteredProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  } 
};

export const fetchQuery = async (query) => { 
  const { data } = await axios(`${ENDPOINTS.PRODUCTS_BY_QUERY}?q=${query}`);
  return data;
};

// запит для Сторінка Cart!!

/*export const fetchProductsByIds = async ids => {
  const promises = ids.map(id =>
    axios(`${ENDPOINTS.PRODUCTS_BY_ID}/${id}`).then(res => res.data)
  );
  return await Promise.all(promises);
};*/
