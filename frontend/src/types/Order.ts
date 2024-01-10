export interface OrderItem {
  item: number,
  quantity: number,
}

export interface OrderAddInfo{
  id: number,
  customer_first_name: string,
  customer_last_name: string,
  customer_email: string,
  customer_phone: string,
  delivery_region: string,
  delivery_city: string,
  delivery_nova_post_department: string,
}