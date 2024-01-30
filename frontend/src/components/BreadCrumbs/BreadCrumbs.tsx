import {
  Link,
  useLocation,
} from 'react-router-dom';
import './BreadCrumbs.scss';
import { ProductDetails } from '../../types/ProductDetails';
import { createSlug } from '../../helpers/helpers';

type Props = {
  product: ProductDetails,
};

export const BreadCrumbs: React.FC<Props> = ({ product }) => {
  const { pathname } = useLocation();

  return (
    <div className="BreadCrumbs" data-cy="breadCrumbs">
      <Link to="/shop" className="BreadCrumbs__link">
        Shop
      </Link>

      <div className="BreadCrumbs__icon icon icon--arrow-right" />

      <Link 
        to={`/shop?category=${createSlug(product.category)}`} 
        className="BreadCrumbs__link"
      >
        {product.category}
      </Link>

      <div className="BreadCrumbs__icon icon icon--arrow-right" />

      <span className="BreadCrumbs__current">
        {product.name}
      </span>
    </div>
  );
};
