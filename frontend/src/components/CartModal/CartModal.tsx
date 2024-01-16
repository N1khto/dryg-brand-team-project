import { useContext, useMemo, useState } from 'react';
import './CartModal.scss';
import { CartContext } from '../../context/CartContext';
import { ProductInCart } from '../ProductInCart';
import { SmallButton } from '../SmallButton';
import { useNavigate } from 'react-router-dom';
import { OrderRequest } from '../../types/Order';
import { sendOrder } from '../../api/order';

type Props = {
  onClose: (value: boolean) => void,
}

export const CartModal: React.FC<Props> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    cart,
    visibleProducts,
    countProductInCart,
    setOrderInfo,
  } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    return cart.reduce((sum, product) => sum + (+product.price), 0);
  }, [cart]);

  const handleCheckoutClick = () => {
    const orderItems: OrderRequest = {
      order_items: visibleProducts.map(product => ({
        item: product.id,
        quantity: countProductInCart(product.id),
      }))
    }    

    setIsLoading(true);

    sendOrder(orderItems)
      .then((order) => {
        navigate('checkout');
        onClose(false);
        setOrderInfo({
          id: order.id,
          payment_link: order.payment_link,
        })    
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        setIsLoading(false);
      })
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
          {!!cart.length ? (
          <ul className="CartModal__list">
            {visibleProducts.map(product => (
              <li key={product.id}>
                <ProductInCart product={product} isCartOpen={true}/>
              </li>
            ))}
          </ul>
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>        

        <div className="CartModal__total">
          <p className="CartModal__total-title">Subtotal</p>
          <p className="CartModal__total-value">{`${totalPrice} UAH`}</p>
        </div>

        {!!cart.length && (
          <div className="CartModal__button">
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
};
