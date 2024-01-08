import { useEffect, useMemo, useState } from 'react';
import { ProductList } from '../../components/ProductList';
import './ShopPage.scss';
import { Product } from '../../types/Product';
import { ShopTopBar } from '../../components/ShopTopBar';
import { useSearchParams } from 'react-router-dom';
import { applyFilterAndSort } from '../../helpers/applyFilterAndSort';
import { getSearchWith } from '../../helpers/searchHelper';
import { SearchParams } from '../../types/Categories';
import { NoSearchResults } from '../../components/NoSearchResults';
import { Pagination } from '../../components/Pagination';
import { ITEMS_PER_PAGE, SORT_BY } from '../../helpers/constants';
import initialProducts from '../../data/products.json';



export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const filters = searchParams.toString().split('&')
    .filter(filter => !filter.includes('category') && !filter.includes('page'));
  console.log(filters)

  useEffect(() => {
    // setSearchParams(getSearchWith({ [SearchParams.Category]: 'all' }, searchParams));
  }, [])

  const handleRemoveFilter = (filter: string) => {
    const newSearchParams = filters.filter(f => f !== filter).join('&');
    setSearchParams(new URLSearchParams(newSearchParams));
  }

  const filteredProducts = useMemo(() => {
    return applyFilterAndSort(products, searchParams);
  }, [products, searchParams]);

  const totalProducts = filteredProducts.length;
  const currentPage = +(searchParams.get(SearchParams.Page) || '1');
  const pagesAmount = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  const firstItem = (currentPage * +ITEMS_PER_PAGE) - ITEMS_PER_PAGE;
  const lastItem = (ITEMS_PER_PAGE * currentPage) < totalProducts
    ? ITEMS_PER_PAGE * currentPage
    : totalProducts;

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(firstItem, lastItem);
  }, [filteredProducts, firstItem, lastItem]);

  return (
    <div className="ShopPage">
      <ShopTopBar />
      {filters[0] !== '' && !!filters.length && <div className="ShopPage__filters">
        {filters.map(filter => {
          const filterName = filter.split('=')[1];
          const filterCategory = filter.split('=')[0];

          return (
            <button
              className="ShopPage__filters-button"
              key={filter} 
              type="button" 
              onClick={() => handleRemoveFilter(filter)}
            >
              <span className="ShopPage__filters-name">
                {filterCategory === 'sort' ? SORT_BY[filterName] :filterName}
              </span>
              <div className="icon icon--close"></div>
            </button>
          )
        })}
      </div>}
      {!totalProducts && <NoSearchResults/>}
      {!!totalProducts && <ProductList products={visibleProducts} />}
      {!!totalProducts && pagesAmount !== 1 && (
        <Pagination
          pagesAmount={pagesAmount}
          currentPage={currentPage}
        />
      )}
    </div>
  )
}