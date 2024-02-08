import { PAYMENT } from '../contants/endpoints';
import { client } from '../helpers/httpClient';
import { Payment } from '../types/Order';

export const payment = () => {
  return client.get<Payment>(PAYMENT.GET);
};
