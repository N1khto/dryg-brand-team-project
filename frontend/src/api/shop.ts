import { PRODUCTS } from '../contants/endpoints';
import { client } from '../helpers/httpClient';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const getProducts = (searchParams:string) => {
  return client.get<Product[]>(PRODUCTS.GET + searchParams);
};


export const getProductDetails = (slug: string) => {
  return client.get<ProductDetails>(PRODUCTS.GET + slug);
};

export const toggleWhishilist = (productId: number) => {
  return client.get<ProductDetails>(PRODUCTS.GET + productId + PRODUCTS.WISHLIST);
};



