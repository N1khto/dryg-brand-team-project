import { USER } from '../contants/endpoints';
import { client } from '../helpers/httpClient';
import { OrderResponse } from '../types/Order';
import { Product } from '../types/Product';
import {
  Address,
  Login,
  RefreshToken,
  TokenObtainPair,
  User,
  UserRegister,
  UserRegistered
} from '../types/User';

export const getToken = (user: Login) => {
  return client.post<TokenObtainPair>(USER.TOKEN.GET, user);
};

export const refreshToken = (refreshToken: RefreshToken) => {
  return client.post<TokenObtainPair>(USER.TOKEN.REFRESH, refreshToken);
};

export const getUser = () => {
  return client.get<User>(USER.ACCOUNT.GET);
};

export const updateUserName = (
  newData: Pick<User, 'first_name' | 'last_name'>
) => {
  return client.patch<User>(USER.ACCOUNT.GET, newData);
};

export const updateUserAddress = (newAddress: Address) => {
  return client.patch<Address>(USER.ACCOUNT.ADDRESS, newAddress);
};

export const getUserHistory = () => {
  return client.get<{ user_orders: OrderResponse[] }>(USER.ACCOUNT.HISTORY);
};

export const getUserWishlist = () => {
  return client.get<{ user_wishlist: Product[] }>(USER.ACCOUNT.WISHLIST);
};

export const registerUser = (user: UserRegister) => {
  return client.post<UserRegistered>(USER.REGISTER, user);
};

export const logout = () => {
  return client.post(USER.LOGOUT, {});
};
