import { Product } from "../types/Product";

export function createSlug(category: string) {
  let slug = category.split(' ').join('-').toLowerCase();

  if (slug[slug.length - 1] === 's') {
    slug = slug.slice(0, slug.length - 1);
  }
  
  return slug;
}; 

export function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const getProductById = (products: Product[], id: number) => {
  return products.find(product => product.id === id);
};

export function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1);
}
