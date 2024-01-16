import { FormEvent, useContext, useState } from 'react';
import './SearchModal.scss';
import { Product } from '../../types/Product';
import { FavouritesContext } from '../../context/FavContext';
import { ProductInSearch } from '../ProductInSearch';
import { SmallButton } from '../SmallButton';
import { useNavigate } from 'react-router-dom';

type Props = {
  onClose: (value: boolean) => void,
}

export const SearchModal: React.FC<Props> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { favourites } = useContext(FavouritesContext);
  const [products, setProducts] = useState<Product[]>([]);

  const handleViewAllClick = () => {
    onClose(false);
    navigate('/shop');
  }

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!query.trim()) {
      return;
    }

    setSearch(query);
  }


  return (
    <div className="SearchModal">
      <div className="SearchModal__container">
        <div className="SearchModal__header">
          <button type="button" onClick={() =>onClose(false)}>
            <div className="icon icon--close"/>
          </button>
        </div>

        <div className="SearchModal__content">
          <form action="" onSubmit={handleSearch}>
            <input 
              type="text"
              placeholder="Search" 
              className="SearchModal__input"
              value={query}
              onChange={(e) => setQuery(e.target.value)} 
            />
          </form>          

          {!products.length && search && (
            <p className="SearchModal__info">
              {`No results for "${search}"`}. 
              <br/> Check the spelling or use a different word or phrase.
              </p>
          )} 

          {!!products.length && (
            <div className="SearchModal__inner">
              <ul className="SearchModal__list">
                {products.map(product => (
                  <li key={product.id}>
                    <ProductInSearch product={product} />
                  </li>
                ))}
              </ul>

              <SmallButton text="view all" onClick={handleViewAllClick} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

