export interface ProductDetails {
  id: number,  
  model: string,
  color: string,
  size: ProductSize,
  fabric: string,
  stock: number,
  price: string,
  stripe_product_id: string,
  date_added: string,
  images: string[],
  sizes_available: string[],
  colors_available: string[],   
}

interface ProductSize {
  id: number,
  tag: string,
  value: string,
  length: number,
  width: number,
}