import { Product } from "../types/Product";

export function createSlug(category: string[]) {
  const capitalized = category.map(word => capitalize(word)).join('');
  let normalizedCategory = capitalized.split('').filter(ch => ch !== '-' && ch !== ' ').join('');
  normalizedCategory = normalizedCategory[0].toLowerCase() + normalizedCategory.slice(1)

  return normalizedCategory;
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
