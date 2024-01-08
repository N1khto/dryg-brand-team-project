import { useNavigate } from 'react-router-dom';
import { AccountTop } from '../../components/AccountTop';
import { BigButton } from '../../components/BigButton';
import './AccountHistoryPage.scss';

export const AccountHistoryPage = () => {
  const navigate = useNavigate();

   return (
    <div className="AccountHistoryPage">
      <AccountTop />
      <p>No orders has been made yet</p>
      <BigButton text="Shop" onClick={() => navigate('/shop')} />
    </div>
   )
}