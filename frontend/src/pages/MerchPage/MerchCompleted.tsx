import React from 'react';
import { useNavigate } from 'react-router-dom';

import { BigButton } from '../../components/BigButton';

export const MerchCompleted = React.memo(() => {
  const navigate = useNavigate();

  return (
    <div className="OrderCompleted">
      <h3>Thank you for your order! We know you're going to love it.</h3>
      <p>
        {' '}
        Our dedicated manager will be reaching out to you shortly to finalize
        all the details.
      </p>

      <BigButton text="Shop" onClick={() => navigate('/shop')} />
    </div>
  );
});
