import { Link } from 'react-router-dom';
import './ProductInSearch.scss';
import { Product } from '../../types/Product';
import { MEDIA_URL } from '../../contants/endpoints';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


type Props = {
  product: Product;
  onClose: (value: boolean) => void;
};

export const ProductInSearch: React.FC<Props> = ({ product, onClose }) => {
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
      onClick={() => onClose(false)}
    >
      <div className="ProductInSearch__photo">
        <LazyLoadImage
          src={MEDIA_URL + images[0]}
          alt={name}
          className="ProductInSearch__photo-img"
          wrapperClassName="ProductInSearch__photo-img"
          effect="blur"
          placeholderSrc="img/placeholder.png"
        />
      </div>

      <div className="ProductInSearch__content">
        <h4 className="ProductInSearch__title">
          {name}
        </h4>

        <p className="ProductInSearch__price">
          {`${Number.parseInt(price)}UAH`}
        </p>
      </div>      
    </Link>
  );
};
