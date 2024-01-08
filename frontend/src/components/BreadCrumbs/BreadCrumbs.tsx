import {
  Link,
  useLocation,
} from 'react-router-dom';
import './BreadCrumbs.scss';
import { capitalize } from '../../helpers/helpers';
import { ProductDetails } from '../../types/ProductDetails';
import { CATEGORIES_FILTER } from '../../helpers/constants';

type Props = {
  product?: ProductDetails,
};

export const BreadCrumbs: React.FC<Props> = ({ product = null }) => {
  const { pathname } = useLocation();
  const caregoryName = pathname.slice(1).split('/')[2].split('-')[0];

  return (
    <div className="BreadCrumbs" data-cy="breadCrumbs">
      <Link to="/shop" className="BreadCrumbs__link">
        Shop
      </Link>

      <div className="BreadCrumbs__icon icon icon--arrow-right" />

      {!product ? (
        <span className="BreadCrumbs__current">
          {CATEGORIES_FILTER[caregoryName]}
        </span>
      ) : (
        <>
          <Link to={`/shop?category=${caregoryName}`} className="BreadCrumbs__link">
            {CATEGORIES_FILTER[caregoryName]}
          </Link>

          <div className="BreadCrumbs__icon icon icon--arrow-right" />

          <span className="BreadCrumbs__current">
            {product.model}
          </span>
        </>
      )}
    </div>
  );
};
