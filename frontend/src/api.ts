import { client } from './helpers/httpClient';
import { OrderItem } from './types/Order';
import { Product } from './types/Product';
import { ProductDetails } from './types/ProductDetails';
import { Address, Login, RefreshToken, TokenObtainPair, User, UserRegister } from './types/User';

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

export const refreshToken = (refreshToken: RefreshToken) => {
  return client.post<TokenObtainPair>('user/token/refresh/', refreshToken);
};


export const logout = () => {
  return client.post('user/logout/', {});
};

export const getUser = () => {
  return client.get<User>('user/me/');
};

export const updateUserName = (newData: Pick<User, 'first_name' | 'last_name'>) => {
  return client.patch<User>('user/me/', newData);
};

export const updateUserAddress = (newAddress: Address) => {
  return client.patch<Address>('user/me/address/', newAddress);
};


export const registerUser = (user: UserRegister) => {
  return client.post<UserRegister>('user/register/', user);
};
