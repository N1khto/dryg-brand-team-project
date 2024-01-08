import { Link } from 'react-router-dom';
import './ProductCard.scss';

import { AddToFavButton } from '../AddToFavButton';
import { Product } from '../../types/Product';
import { BASE_URL } from '../../helpers/constants';
import { createSlug } from '../../helpers/helpers';
import { useContext, useState } from 'react';
import { FavouritesContext } from '../../context/FavContext';
import { AddedModal } from '../AddedModal';
import { RemovedModal } from '../RemovedModal';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const [isOver, setIsOver] = useState(false);
  const { favourites, setFavourites } = useContext(FavouritesContext);
  const [isAddedModalOpen, setIsAddedModalOpen] = useState(false);
  const [isRemovedModalOpen, setIsRemovedModalOpen] = useState(false);

  const handleAddToFav = (product: Product) => {
    setIsAddedModalOpen(false)
    setIsRemovedModalOpen(false)
    if (favourites.some(fav => fav.id === product.id)) {
      setFavourites((currentFavs: Product[]) => (
        currentFavs.filter(fav => fav.id !== product.id)        
      ))
      setIsRemovedModalOpen(true)
    } else {
      setFavourites((currentFavs: Product[]) => [...currentFavs, product]);
      setIsAddedModalOpen(true);
    }
  };

  const {
    name,
    max_price,
    images,
    slug,
  } = product;


  return (
    <div className="ProductCard">
      <Link
        to={`/shop/products/${slug}`}
        className="ProductCard__main"
        onMouseOver={() => setIsOver(true)}
        onMouseOut={() => setIsOver(false)}
      >
        <img
          src={isOver ? `${images[1]}`: `${images[0]}`}
          alt={name}
          className="ProductCard__photo"
          style={{ animation: isOver ? 'fade-in 0.5s ease-in': 'none'
          }}
        />

        <div className="ProductCard__content">
          <div className="ProductCard__container">
            <h4 className="ProductCard__title">
              {name}
            </h4>

            <p className="ProductCard__price">
              {`${max_price}UAH`}
            </p>
          </div>

          <AddToFavButton product={product} handleAddToFav={handleAddToFav}/>
        </div>      
      </Link>
      {isAddedModalOpen && <AddedModal setIsAddedModalOpen={setIsAddedModalOpen} />}
      {isRemovedModalOpen && <RemovedModal setIsRemovedModalOpen={setIsRemovedModalOpen}/>}
    </div>
  );
};
