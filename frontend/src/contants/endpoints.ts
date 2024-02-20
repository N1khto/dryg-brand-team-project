export const BASE_URL = 'https://dryg-brand-backend.onrender.com/api/';
export const MEDIA_URL = 'https://dryg-brand-backend.onrender.com';

export const PRODUCTS = {
  GET: 'shop/products/',
  WISHLIST: '/wishlist'
};

export const USER = {
  TOKEN: {
    GET: 'user/token/',
    VERIFY: 'user/token/verify/',
    REFRESH: 'user/token/refresh/'
  },
  ACCOUNT: {
    GET: 'user/me/',
    ADDRESS: 'user/me/address',
    WISHLIST: 'user/me/wishlist',
    HISTORY: 'user/me/order_history'
  },
  REGISTER: 'user/register/',
  LOGOUT: 'user/logout/'
};

export const PAYMENT = {
  GET: 'payments/',
  CANCEL: 'payments/cancel/',
  SUCCESS: 'payments/success/'
};

export const ORDER = {
  GET: 'orders/',
  ADD_INFO: 'add_info'
};
