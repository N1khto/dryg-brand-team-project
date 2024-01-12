import Cookies from 'js-cookie';
import { BASE_URL } from './constants';

function wait(delay: number) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

function request<T>(
  url = '',
  method: RequestMethod = 'GET',
  data: any = null,
  
): Promise<T> {
  const options: RequestInit = { method };

  options.headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': `Bearer ${Cookies.get('access_token')}`
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return wait(500)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url?: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
  put: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
};
