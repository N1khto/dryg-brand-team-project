import { Product } from '../types/Product';

export function removeDublicates(products: Product[]) {
  const names: string[] = [];
  let visibleProducts: Product[] = [...products]
    .filter(product => {
      if (names.includes(product.name)) {
        return false;
      }

      names.push(product.name);
      return true;
    });

  return visibleProducts;
}
