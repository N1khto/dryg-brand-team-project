import React, { useContext } from 'react';
import cn from 'classnames';
import './AddToCartButton.scss';

import { CartContext } from '../../context/CartContext';
import { ProductDetails } from '../../types/ProductDetails';

type Props = {
  product: ProductDetails;
};

export const AddToCartButton: React.FC<Props> = React.memo(({ product }) => {
  const { cart, handleAddToCart, setIsCartOpen } = useContext(CartContext);
  const isProductInCart = cart.some((item) => item.id === product.id);

  return (
    <button
      type="button"
      className={cn('AddToCartButton', {
        'added-to-cart': isProductInCart
      })}
      disabled={!product.stock}
      onClick={(event) => {
        event.preventDefault();
        handleAddToCart(product);
        setIsCartOpen(true);
      }}
    >
      {!isProductInCart && !!product.stock && 'Add to cart'}
      {isProductInCart && !!product.stock && 'Added to cart'}
      {!product.stock && 'Out of Stock'}
    </button>
  );
});
