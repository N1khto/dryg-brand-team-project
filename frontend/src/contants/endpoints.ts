export const BASE_URL = 'http://127.0.0.1:8080/api/';
export const MEDIA_URL = 'http://127.0.0.1:8080'

export const USER = {
  TOKEN: {
    GET: 'user/token/',
    VERIFY: 'user/token/verify/', 
    REFRESH: 'user/token/refresh/',
  },
  ACCOUNT: {
    GET: 'user/me/',
    ADDRESS: 'user/me/address',
    WISHLIST:'user/me/wishlist',
    HISTORY: 'user/me/order_history',
  },
  REGISTER: 'user/register/',
  LOGOUT: 'user/logout/',
}

export const PAYMENT = {
  GET: 'payments/',
  CANCEL: 'payments/cancel/',
  SUCCESS: 'payments/success/',
}

export const ORDER = {
  GET: 'orders/',
  ADD_INFO: 'add_info',
}