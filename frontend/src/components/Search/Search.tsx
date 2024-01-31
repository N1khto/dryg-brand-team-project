import { FormEvent, useEffect, useRef, useState } from 'react';
import './Search.scss';
import { Product } from '../../types/Product';
import { ProductInSearch } from '../ProductInSearch';
import { SmallButton } from '../SmallButton';
import { useNavigate } from 'react-router-dom';
import ModalWrapper from '../ModalWrapper/ModalWrapper';
import { getProducts } from '../../api/shop';
import { SearchParams } from '../../types/Categories';
import { Loader } from '../Loader';
import classNames from 'classnames';

type Props = {
  onClose: (value: boolean) => void,
}

const Search: React.FC<Props> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    }
  }, []); 
  
  const handleViewAllClick = () => {
    onClose(false);
    navigate(`/shop/products/?${SearchParams.Search}=${query}`);
  }

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();    

    if (!query.trim()) {
      return;
    }

    setSearch(query);
    setProducts([]);
    setIsLoading(true);
    getProducts(`?${SearchParams.Search}=${query}`)
      .then((data) => {
        setProducts(data);
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <div className="Search">
      <div className="Search__header">
        <button type="button" onClick={() =>onClose(false)}>
          <div className="icon icon--close"/>
        </button>
      </div>

      <div className="Search__content">
        <form action="" onSubmit={handleSearch}>
          <input 
            type="text"
            placeholder="Search" 
            className={classNames("Search__input", {
              'input-active': !!query,
            })}
            value={query}
            onChange={(e) => setQuery(e.target.value)} 
          />
        </form>

        {isLoading && <Loader />}          

        {!products.length && search && !isLoading && (
          <p className="Search__info">
            {`No results for "${search}"`}. 
            <br/> Check the spelling or use a different word or phrase.
            </p>
        )} 

        {!!products.length && (
          <div className="Search__inner">
            <ul className="Search__list">
              {products.slice(0, 2).map(product => (
                <li key={product.id}>
                  <ProductInSearch product={product} onClose={onClose} />
                </li>
              ))}
            </ul>

            <SmallButton text="view all" onClick={handleViewAllClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalWrapper(Search);