import { Link } from 'react-router-dom';
import './ProductCard.scss';
import { AddToFavButton } from '../AddToFavButton';
import { Product } from '../../types/Product';
import { useState } from 'react';
import { AddedModal } from '../AddedModal';
import { RemovedModal } from '../RemovedModal';
import { toggleWhishilist } from '../../api/shop';
import { MEDIA_URL } from '../../contants/endpoints';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const [isAddedModalOpen, setIsAddedModalOpen] = useState(false);
  const [isRemovedModalOpen, setIsRemovedModalOpen] = useState(false);

  const {
    name,
    price,
    images,
    slug,
  } = product;

  return (
    <div className="ProductCard">
      <Link
        to={`/shop/products/${slug}`}
        className="ProductCard__main"
      >
        <div className="ProductCard__photo">
          <img
            src={MEDIA_URL + images[0]}
            alt={name}
            className="ProductCard__photo-front"
          />
          
          <img
            src={MEDIA_URL + images[1]}
            alt={name}
            className="ProductCard__photo-back"
          />
        </div>        

        <div className="ProductCard__content">
          <div className="ProductCard__container">
            <h4 className="ProductCard__title">
              {name}
            </h4>

            <p className="ProductCard__price">
              {`${Number.parseInt(price)} UAH`}
            </p>
          </div>

          <AddToFavButton product={product} setIsAddedModalOpen={setIsAddedModalOpen} setIsRemovedModalOpen={setIsRemovedModalOpen}/>
        </div>      
      </Link>
      {isAddedModalOpen && <AddedModal setIsAddedModalOpen={setIsAddedModalOpen} />}
      {isRemovedModalOpen && <RemovedModal setIsRemovedModalOpen={setIsRemovedModalOpen}/>}
    </div>
  );
};
