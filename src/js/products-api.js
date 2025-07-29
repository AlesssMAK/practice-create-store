import axios from 'axios';
import { BASE_URL, ENDPOINTS, ITEMS_PER_PAGE } from './constants';

axios.defaults.baseURL = BASE_URL;

export const fetchCategories = async () => {
  const { data } = await axios(`${ENDPOINTS.CATEGORIES}`);
  return data;
};

export const fetchProducts = async (page) => {
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const { data } = await axios(`${ENDPOINTS.PRODUCTS}?limit=${ITEMS_PER_PAGE}&skip=${skip}`);
    return data;
    
};

export const fetchByCategory = async (category) => {
  const { data } = await axios(`${ENDPOINTS.PRODUCTS_BY_CATEGORY}/${category}`);
  return data;
};

export const fetchModal = async (id) => {
  const { data } = await axios(`${ENDPOINTS.PRODUCTS_BY_ID}/${id}`);
  return data;
};

export const fetchQuery = async (query, page) => { 
  const skip = (page - 1) * ITEMS_PER_PAGE;
  const { data } = await axios(`${ENDPOINTS.PRODUCTS_BY_QUERY}?q=${query}&limit=${ITEMS_PER_PAGE}&skip=${skip}`);
  return data;
};

