import { FormEvent, useEffect, useState } from 'react';
import './Search.scss';
import { Product } from '../../types/Product';
import { ProductInSearch } from '../ProductInSearch';
import { SmallButton } from '../SmallButton';
import { useNavigate } from 'react-router-dom';
import ModalWrapper from '../ModalWrapper/ModalWrapper';

type Props = {
  onClose: (value: boolean) => void,
}

const Search: React.FC<Props> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    }
  }, []);


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
            className="Search__input"
            value={query}
            onChange={(e) => setQuery(e.target.value)} 
          />
        </form>          

        {!products.length && search && (
          <p className="Search__info">
            {`No results for "${search}"`}. 
            <br/> Check the spelling or use a different word or phrase.
            </p>
        )} 

        {!!products.length && (
          <div className="Search__inner">
            <ul className="Search__list">
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
  );
};

export default ModalWrapper(Search);