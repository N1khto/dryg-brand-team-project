import { Product } from './Product';

export interface ProductDetails {
  id: number;
  name: string;
  category: string;
  fabric: string;
  description: string;
  color: string;
  size: ProductSize;
  stock: number;
  price: string;
  stripe_product_id: string;
  date_added: string;
  images: string[];
  sizes_available: string[];
  colors_available: string[];
  slug: string;
  wishlist: boolean;
}

export interface ProductSize {
  id: number;
  tag: string;
  value: string;
  length: number;
  width: number;
}

export interface ItemDetails {
  id: number;
  model: Product;
  color: string;
  size: ProductSize;
  slug: string;
  stock: number;
  price: string;
  stripe_product_id: string;
  date_added: string;
  images: string[];
  sizes_available: string[];
  colors_available: string[];
  wishlist: boolean;
}
