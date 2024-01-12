import { client } from '../helpers/httpClient';
import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

export const getProducts = () => {
  return client.get<Product[]>('shop/products/');
};


export const getProductDetails = (slug: string) => {
  return client.get<ProductDetails>(`shop/products/${slug}/`);
};

export const toggleWhishilist = (productId: number) => {
  return client.get<ProductDetails>(`shop/products/${productId}/wishlist/`);
};



