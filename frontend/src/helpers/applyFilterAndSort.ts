import { SearchParams } from '../types/Categories';
import { Product } from '../types/Product';

export function applyFilterAndSort(
  products: Product[],
  searchParams: URLSearchParams,
) {
  let filteredProducts: Product[] = [...products];
  // const query = searchParams.get(SearchParams.Query)?.trim().toLowerCase();

  // if (query) {
  //   filteredProducts = filteredProducts.filter(product => {
  //     return product.name.toLowerCase().includes(query);
  //   });
  // }

  return filteredProducts;
}
