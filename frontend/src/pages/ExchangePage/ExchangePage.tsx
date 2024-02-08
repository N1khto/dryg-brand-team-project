import React from 'react';
import './ExchangePage.scss';

export const ExchangePage = React.memo(() => {
  return (
    <div className="ExchangePage">
      <div className="ExchangePage__container">
        <h1 className="ExchangePage__title">Exchange And Returns</h1>

        <ul className="ExchangePage__list">
          <li className="ExchangePage__list-item">
            You have 14 calendar days from receiving the order to
            return/exchange the product through Nova Poshta.
          </li>
          <li className="ExchangePage__list-item">
            Conditions for return/exchange: purchased from the online store,
            within 14 days of order receipt, confirmation of payment and
            delivery, completed return/exchange application, product in
            commercial condition with no signs of use, buyer covers all
            return/exchange costs, exchange limited to goods of equal value.
          </li>
          <li className="ExchangePage__list-item">
            Return/exchange available throughout Ukraine, excluding Crimea,
            occupied territories, and active war zones.
          </li>
          <li className="ExchangePage__list-item">
            The receipt and return/exchange application are on the same sheet
            enclosed with each order.
          </li>
        </ul>
      </div>
    </div>
  );
});
