import { Link } from 'react-router-dom';
import { OrderResponse } from '../../types/Order';
import { ProductInCart } from '../ProductInCart';
import './OrderItem.scss';
import { useState } from 'react';

interface Props {
  order: OrderResponse,
}

export const OrderItem: React.FC<Props> = ({ order }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  console.log(order)
  return (
    <>
      <div className="OrderItem">
        <div className="OrderItem__left">
          <div className="OrderItem__left-top">
            <p className="OrderItem__id">{`№ ${order.id}`}</p>
            <p className="OrderItem__date">{order.order_date.slice(0, 10)}</p>
          </div>

          <div className="OrderItem__left-status">{order.status}</div>
        </div>

        <div className="OrderItem__right">
          <ul className="OrderItem__list">
            {order.order_items.map(product => (
              <li key={product.id} className="OrderItem__list-item" >
                <img 
                  src={`http://127.0.0.1:8080${product.item.images[0]}`} 
                  alt={`${product.item.model}`}
                  className="OrderItem__list-img" 
                />
              </li>
            ))}
          </ul>

          <div className="OrderItem__right-button">
            <p className="OrderItem__total">{`${order.total_price} UAH`}</p>
            <button type="button" onClick={() => setIsDetailOpen(!isDetailOpen)}>
              <div className="icon icon--arrow-down"></div>
            </button>
          </div>
        </div>
      </div>

      {isDetailOpen && (
        <div className="OrderItem__details">
          <div className="OrderItem__details-top">
            <h4 className="OrderItem__details-title">Purchased goods:</h4>
            <ul className="OrderItem__details-list">
              {order.order_items.map(product => (
                <li key={product.id} className="OrderItem__details-list-item" >
                  <div className="ProductInCart">
                    <Link 
                        to={`/shop/product/${product.item.model}`} 
                        className="ProductInCart__photo"
                      >
                        <img
                          src={`http://127.0.0.1:8080${product.item.images[0]}`} 
                          alt={`${product.item.model}`}
                          className="ProductInCart__img"
                        />
                      </Link>                      

                    <div className="ProductInCart__container">
                      <Link
                        to={`/shop/product/${product.item.model}`} 
                        className="ProductInCart__name"
                      >
                        {product.item.model}
                      </Link>

                      <p className="ProductInCart__price">{`${product.item.price} UAH`}</p>
                      <p className="ProductInCart__size">{product.item.size}</p>
                    </div>
                  </div>                  
                </li>
              ))}
            </ul>
          </div>

          <div className="OrderItem__details-delivery">
            <h4 className="OrderItem__details-title">Delivery information:</h4>
            <p className="OrderItem__details-delivery-info">{order.customer_first_name}</p>
            <p className="OrderItem__details-delivery-info">{order.customer_last_name}</p>
            <p className="OrderItem__details-delivery-info">{order.customer_email}</p>
            <p className="OrderItem__details-delivery-info">{order.customer_phone}</p>
            <p className="OrderItem__details-delivery-info">{order.delivery_region}</p>
            <p className="OrderItem__details-delivery-info">{order.delivery_city}</p>
            <p className="OrderItem__details-delivery-info">
              {`Nova Post Branch #${order.delivery_nova_post_department}`}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
