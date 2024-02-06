import { useContext } from 'react';
import './OrderCompleted.scss';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { BigButton } from '../../components/BigButton';

export const OrderCompleted = () => {
  const { orderInfo } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="OrderCompleted">      
      <h3>Thank you for your order! We know you're going to love it.</h3> 
      <p>You order №{orderInfo?.id}. <br/>We will notify you once your items are ready for delivery.</p>
      
      <BigButton text="Shop" onClick={() => navigate('/shop')} />
    </div>
  );
};
