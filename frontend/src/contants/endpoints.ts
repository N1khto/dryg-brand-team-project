export const BASE_URL = process.env.FRONT_BASE_URL;
export const MEDIA_URL = process.env.FRONT_MEDIA_URL;

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
