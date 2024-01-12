export interface OrderItem {
  id: number,
  item: number,
  quantity: number,
  item_price: string,
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

export interface Order {
  id:	number,
  user: number,
  order_date: string,
  total_price: string
  status: string,
  order_items:	OrderItem[],
  payment_link: string,
  customer_first_name: string,
  customer_last_name: string,
  customer_email: string,
  customer_phone: string,
  delivery_region: string,
  delivery_city: string,
  delivery_nova_post_department: number,
  }