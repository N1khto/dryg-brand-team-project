
export interface OrderItem {
  id: number,
  item: {
    id: 1,
    slug: string,
    model: string,
    color: string,
    size: string,
    stock: number,
    price: string,
    stripe_product_id: string,
    date_added: string,
    images: string[]
  },
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
  delivery_nova_post_department: number,
}

export interface OrderResponse {
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

export interface OrderRequest {
  order_items: {
    item: number,
    quantity:number
  }[]
}

export interface OrderInfo {
  id: number,
  payment_link: string,
}

export interface Payment {
  id: number,
  status: string,
  order: number,
  session_url:  string,
  session_id: string,
  money_to_pay: string,
}