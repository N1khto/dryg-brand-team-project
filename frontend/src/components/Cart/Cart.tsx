import React, { useContext, useEffect, useMemo, useState } from 'react';
import './Cart.scss';
import { CartContext } from '../../context/CartContext';
import { ProductInCart } from '../ProductInCart';
import { SmallButton } from '../SmallButton';
import { useNavigate } from 'react-router-dom';
import { OrderRequest } from '../../types/Order';
import { sendOrder } from '../../api/order';
import ModalWrapper from '../ModalWrapper/ModalWrapper';

type Props = {
  onClose: (value: boolean) => void,
}

const Cart: React.FC<Props> = React.memo(({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    cart,
    visibleProducts,
    countProductInCart,
    setOrderInfo,
  } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    }
  }, []);

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, product) => sum + (Number.parseInt(product.price)), 0);
  }, [cart]);

  const handleCheckoutClick = () => {
    const orderItems: OrderRequest = {
      order_items: visibleProducts.map(product => ({
        item: product.id,
        quantity: countProductInCart(product.id),
        stripe_product_id: product.stripe_product_id,
      }))
    }    

    setIsLoading(true);

    sendOrder(orderItems)
      .then((order) => {
        setOrderInfo({
          id: order.id,
          uuid: order.uuid,
          payment_link: order.payment_link,
        })
        navigate('checkout');
        onClose(false);    
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  return (
    <div className="Cart">
      <div className="Cart__header">
        <h2 className="Cart__title">Cart</h2>
        <button type="button" onClick={() =>onClose(false)}>
          <div className="icon icon--close"/>
        </button>
      </div>

      
      <div className="Cart__content">
        {!!cart.length ? (
        <ul className="Cart__list">
          {visibleProducts.map(product => (
            <li key={product.id}>
              <ProductInCart product={product} isCartOpen={true} />
            </li>
          ))}
        </ul>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      <div className="Cart__wrapper">
      <div className="Cart__total">
        <p className="Cart__total-title">Subtotal</p>
        <p className="Cart__total-value">{`${totalPrice} UAH`}</p>
      </div>

      {!!cart.length && (
        <div className="Cart__button">
          <SmallButton 
            text={'Checkout'} 
            onClick={handleCheckoutClick}
            isLoading={isLoading}
          />
        </div>
      )}
      </div>        

      
    </div>
  );
});

export default ModalWrapper(Cart);
