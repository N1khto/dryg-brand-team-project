import { useNavigate } from 'react-router-dom';
import { AccountTop } from '../../components/AccountTop';
import { BigButton } from '../../components/BigButton';
import './AccountHistoryPage.scss';
import { useEffect, useState } from 'react';
import { getUserHistory } from '../../api/user';
import { OrderResponse } from '../../types/Order';
import { Loader } from '../../components/Loader';
import { Order } from '../../components/Order/Order';

export const AccountHistoryPage = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    getUserHistory()
      .then((resp) => {
        setOrders(resp.user_orders)
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        setIsLoading(false);
      })

  }, [])
 

   return (
    <div className="AccountHistoryPage">
      <AccountTop />

      {isLoading && <Loader />}

      {!isLoading && !orders.length && (
        <>
          <p className="AccountHistoryPage__text">
            No orders has been made yet
          </p>
          <BigButton text="Shop" onClick={() => navigate('/shop')} />
        </>
      )}

      {!isLoading && !!orders.length && (
        <ul className="AccountHistoryPage__list">
          {orders.map(order => (
            <li key={order.id}>
              <Order order={order} />
            </li>
          ))}
        </ul>
      )}      
    </div>
  );
};


