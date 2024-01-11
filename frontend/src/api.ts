import { client } from './helpers/httpClient';
import { OrderItem } from './types/Order';
import { Product } from './types/Product';
import { ProductDetails } from './types/ProductDetails';
import { Address, Login, TokenObtainPair, UserRegister } from './types/User';

export const getProducts = () => {
  return client.get<Product[]>('shop/products/');
};


export const getProductDetails = (slug: string) => {
  return client.get<ProductDetails>(`shop/products/${slug}/`);
};

export const toggleWhishilist = (productId: number) => {
  return client.get<ProductDetails>(`shop/products/${productId}/wishlist/`);
};


export const sendOrder = (orderItems: OrderItem[]) => {
  return client.post<OrderItem[]>('orders/', orderItems);
};

export const getToken = (user: Login) => {
  return client.post<TokenObtainPair>('user/token/', user);
};

export const Logout = () => {
  return client.post('user/logout/', {});
};


export const registerUser = (user: UserRegister) => {
  return client.post<UserRegister>('user/register/', user);
};


export const addAddress = (address: Address) => {
  return client.post<Address>('me/address/', address);
};