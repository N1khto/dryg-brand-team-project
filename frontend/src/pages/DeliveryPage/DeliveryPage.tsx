import React from 'react';
import './DeliveryPage.scss';

export const DeliveryPage = React.memo(() => {
  return (
    <div className="DeliveryPage">
      <div className="DeliveryPage__container">
        <h1 className="DeliveryPage__title">Delivery And Payment</h1>

        <ul className="DeliveryPage__list">
          <li className="DeliveryPage__list-item">
            Nova Poshta handles deliveries across Ukraine to a designated branch
            or address. The delivery cost is calculated based on the order's
            declared value, paid separately by the buyer upon receiving the
            order.
          </li>
          <li className="DeliveryPage__list-item">
            Shipment processing takes 1-3 working days, potentially extending
            during sales periods.
          </li>
          <li className="DeliveryPage__list-item">
            Delivery covers all of Ukraine, excluding Crimea, occupied
            territories, and conflict zones.
          </li>
          <li className="DeliveryPage__list-item">
            Once the order is shipped, cancellation won't result in a shipping
            refund.
          </li>
          <li className="DeliveryPage__list-item">
            Upon receiving your order, carefully inspect for defects. If damage
            is identified immediately, refuse the order, fill out a return form,
            and all logistics costs are covered by the Seller. Post-receipt
            discovery of defects may result in refusal of product return.
          </li>
          <li className="DeliveryPage__list-item">
            Order payment options: through the Ukrainian payment system LiqPay;
            with full bank details.
          </li>
        </ul>
      </div>
    </div>
  );
});
