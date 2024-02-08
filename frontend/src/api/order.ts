import { ORDER } from '../contants/endpoints';
import { client } from '../helpers/httpClient';
import {
  MerchRequest,
  OrderAddInfo,
  OrderRequest,
  OrderResponse
} from '../types/Order';

export const sendOrder = (order: OrderRequest) => {
  return client.post<OrderResponse>(ORDER.GET, order);
};

export const addOrderInfo = (
  info: Omit<OrderAddInfo, 'id'>,
  orderId: string
) => {
  return client.patch<OrderAddInfo>(
    `${ORDER.GET}${orderId}/${ORDER.ADD_INFO}`,
    info
  );
};

export const sendMerchOrder = (merchOrder: MerchRequest) => {
  return client.post<MerchRequest>('merch/', merchOrder);
};
