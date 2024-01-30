import { SORT_BY, SearchParams } from '../types/Categories';
import { Product } from '../types/Product';
import { createSlug } from './helpers';

export function applyFilterAndSort(
  products: Product[],
  searchParams: URLSearchParams,
) {
  let filteredProducts: Product[] = [...products];
  const query = searchParams.get(SearchParams.Query)?.trim().toLowerCase();
  const sort = searchParams.get(SearchParams.Sort);
  const category = searchParams.get(SearchParams.Category);
  const colors = searchParams.getAll(SearchParams.Color);
  const sizes = searchParams.getAll(SearchParams.Size);

  filteredProducts = category === 'all' || !category
    ? filteredProducts 
    : filteredProducts.filter(product => createSlug((product.category)) === category);

  if (sort) {
    filteredProducts = filteredProducts.sort((productA, productB) => {
      switch (sort) {
        case SORT_BY.MostExpensive:
          return ((+productA.price) - (+productB.price)) * -1;
        case SORT_BY.Cheapest:
          return (+productA.price) - (+productB.price);
        case SORT_BY.Newest:
          return productA.name.localeCompare(productB.name);
        default:
          return 0;
      }
    });
  }  

  // if (colors.length) {
  //   filteredProducts = filteredProducts.filter(product => {
  //     return colors.some(col => col === product.color)
  //   });
  // }

  // if (sizes.length) {
  //   filteredProducts = filteredProducts.filter(product => {
  //     return sizes.some(size => size === product.size)
  //   }); 
  // }

  if (query) {
    filteredProducts = filteredProducts.filter(product => {
      return product.name.toLowerCase().includes(query);
    });
  }

  return filteredProducts;
}
