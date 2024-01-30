
export const CATEGORIES_FILTER: { [category: string]: string } = {
 'hoodies': 'Hoodies',
  't-shirts': 'T-Shirts',
  'coats': 'Coats',
  'crop top and shorts sets':'Crop Top and Shorts Sets',    
}


export const SIZES = {
  S: 's',
  M: 'm',
  Oversize: 'oversize',
}

export const SORT_BY: { [sort:string]: string } = {
  'date_added': 'date, new to old',
  'price': 'price, low to high',
  '-price': 'price, high to low',
}

export const ITEMS_PER_PAGE = 12;