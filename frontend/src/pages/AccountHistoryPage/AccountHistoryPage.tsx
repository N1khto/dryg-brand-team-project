import { useNavigate } from 'react-router-dom';
import { AccountTop } from '../../components/AccountTop';
import { BigButton } from '../../components/BigButton';
import './AccountHistoryPage.scss';
import { useEffect, useState } from 'react';
import { getUserHistory } from '../../api/user';
import { Order } from '../../types/Order';
import { Loader } from '../../components/Loader';

export const AccountHistoryPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
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

  console.log( typeof orders );
  

   return (
    <div className="AccountHistoryPage">
      <AccountTop />

      {isLoading && <Loader />}

      {!isLoading && !orders.length && (
        <>
          <p>No orders has been made yet</p>
          <BigButton text="Shop" onClick={() => navigate('/shop')} />
        </>
      )}

      {!isLoading && orders.length && (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <p>{order.order_date.slice(0, 10)}</p>
              <p>{`${order.total_price} UAH`}</p>
              <p>{order.status}</p>
            </li>
          ))}
        </ul>
      )}
      
    </div>
   )
}