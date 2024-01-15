import { OrderResponse } from '../../types/Order';
import './OrderItem.scss';

interface Props {
  order: OrderResponse,
}

export const OrderItem: React.FC<Props> = ({ order }) => {
  console.log(order)
  return (
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
            <li key={product.id}>
              <img 
                src={`http://127.0.0.1:8080${product.item.images[0]}`} 
                alt={product.item.name}
                className="OrderItem__list-img" 
              />
            </li>
          ))}
        </ul>

        <div className="OrderItem__right-button">
          <p className="OrderItem__total">{`${order.total_price} UAH`}</p>
          <button type="button">
            <div className="icon icon--arrow-down"></div>
          </button>
        </div>
      </div>

    </div>
  );
};
