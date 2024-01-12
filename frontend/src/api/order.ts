import { client } from "../helpers/httpClient";
import { OrderRequest, OrderResponse } from "../types/Order";

export const sendOrder = (order: OrderRequest) => {
  return client.post<OrderResponse>('orders/', order);
};


