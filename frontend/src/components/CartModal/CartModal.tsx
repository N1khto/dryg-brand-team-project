import { useContext, useMemo, useState } from 'react';
import './CartModal.scss';
import { CartContext } from '../../context/CartContext';
import { ProductInCart } from '../ProductInCart';
import { SmallButton } from '../SmallButton';
import { Link } from 'react-router-dom';
import { sendOrder } from '../../api/shop';

type Props = {
  onClose: (value: boolean) => void,
}

export const CartModal: React.FC<Props> = ({ onClose }) => {
  const {
    cart,
    visibleProducts,
    countProductInCart,
  } = useContext(CartContext);

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, product) => sum + (+product.price), 0);
  }, [cart]);

  const handleCheckoutClick = () => {
    onClose(false);
    const orderItems = visibleProducts.map(product => ({
      item: product.id,
      quantity: countProductInCart(product.id)
    }));
    // sendOrder(orderItems);
  };

  return (
    <div className="CartModal">
      <div className="CartModal__container">
        <div className="CartModal__header">
          <h2 className="CartModal__title">Cart</h2>
          <button type="button" onClick={() =>onClose(false)}>
            <div className="icon icon--close"/>
          </button>
        </div>

        <div className="CartModal__content">
          <ul className="CartModal__list">
            {visibleProducts.map(product => (
              <li key={product.id}>
                <ProductInCart product={product} isCartOpen={true}/>
              </li>
            ))}
          </ul>
        </div>

        <div className="CartModal__total">
          <p className="CartModal__total-title">Subtotal</p>
          <p className="CartModal__total-value">{`${totalPrice} UAH`}</p>
        </div>

        <Link to={'checkout'} className="CartModal__button">
          <SmallButton text={'Checkout'} onClick={handleCheckoutClick}/>
        </Link>
      </div>
    </div>
  );
};
