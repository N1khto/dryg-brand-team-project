import { Link } from 'react-router-dom';
import './BreadCrumbs.scss';
import { ProductDetails } from '../../types/ProductDetails';
import React from 'react';

type Props = {
  product: ProductDetails,
};

export const BreadCrumbs: React.FC<Props> = React.memo(({ product }) => {

  return (
    <div className="BreadCrumbs" data-cy="breadCrumbs">
      <Link to="/shop" className="BreadCrumbs__link">
        Shop
      </Link>

      <div className="BreadCrumbs__icon icon icon--arrow-right" />

      <Link 
        to={`/shop/products?category=${product.category.toLowerCase()}`} 
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
});
