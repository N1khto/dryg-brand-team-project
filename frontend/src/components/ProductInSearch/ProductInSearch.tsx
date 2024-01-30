import { Link } from 'react-router-dom';
import './ProductInSearch.scss';
import { Product } from '../../types/Product';
import { createSlug } from '../../helpers/helpers';
import { useContext, useState } from 'react';

type Props = {
  product: Product,
};

export const ProductInSearch: React.FC<Props> = ({ product }) => {
  const [isOver, setIsOver] = useState(false);

  const {
    name,
    price,
    images,
    slug,
  } = product;


  return (
    <Link
      to={`/shop/products/${slug}`}
      className="ProductInSearch"
      onMouseOver={() => setIsOver(true)}
      onMouseOut={() => setIsOver(false)}
    >
      <img
        src={isOver ? `${images[1]}`: `${images[0]}`}
        alt={name}
        className="ProductInSearch__photo"
        style={{ animation: isOver ? 'fade-in 0.5s ease-in': 'none'
        }}
      />

      <div className="ProductInSearch__content">
        <h4 className="ProductInSearch__title">
          {name}
        </h4>

        <p className="ProductInSearch__price">
          {`${price}UAH`}
        </p>
      </div>      
    </Link>
  );
};
