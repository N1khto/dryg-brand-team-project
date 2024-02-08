import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Order.scss';

import { PAYMENT_STATUS_HEX } from '../../contants/colors';
import { MEDIA_URL } from '../../contants/endpoints';
import { OrderResponse } from '../../types/Order';

interface Props {
  order: OrderResponse;
}

export const Order: React.FC<Props> = React.memo(({ order }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const {
    id,
    order_date,
    order_items,
    delivery_city,
    delivery_nova_post_department,
    customer_email,
    customer_first_name,
    customer_last_name,
    customer_phone,
    status,
    total_price
  } = order;

  return (
    <>
      <div className="Order">
        <div className="Order__left">
          <div className="Order__left-container">
            <div className="Order__left-top">
              <p className="Order__id">{`№ ${id}`}</p>
              <p className="Order__date">{order_date.slice(0, 10)}</p>
            </div>

            <div
              className="Order__left-status"
              style={{
                backgroundColor: `${PAYMENT_STATUS_HEX[status]}`
              }}
            >
              {status}
            </div>
          </div>

          <div className="Order__list-container">
            <ul className="Order__list">
              {order_items.map((product) => (
                <li key={product.id} className="Order__list-item">
                  <LazyLoadImage
                    src={MEDIA_URL + product.item.images[0]}
                    alt={product.item.name}
                    className="Order__list-img"
                    wrapperClassName="Order__list-img"
                    effect="blur"
                    placeholderSrc="img/placeholder.png"
                  />
                </li>
              ))}
            </ul>

            {order_items.length > 3 && (
              <button
                type="button"
                className="Order__list-item-extra"
                onClick={() => setIsDetailOpen(!isDetailOpen)}
              >
                {`+${order_items.length - 3}`}
              </button>
            )}
          </div>
        </div>

        <div className="Order__right">
          <p className="Order__total">{`${Number.parseInt(total_price)} UAH`}</p>
          <button type="button" onClick={() => setIsDetailOpen(!isDetailOpen)}>
            <div
              className={cn('icon icon--arrow-down', {
                icon__rotate: isDetailOpen
              })}
            />
          </button>
        </div>
      </div>

      {isDetailOpen && (
        <div className="Order__details">
          <div className="Order__details-top">
            <h4 className="Order__details-title">Purchased goods:</h4>
            <ul className="Order__details-list">
              {order_items.map((product) => (
                <li key={product.id} className="Order__details-list-item">
                  <div className="ProductInCart">
                    <Link
                      to={`/shop/products/${product.item.slug}`}
                      className="ProductInCart__photo"
                    >
                      <LazyLoadImage
                        src={MEDIA_URL + product.item.images[0]}
                        alt={product.item.name}
                        className="ProductInCart__img"
                        wrapperClassName="ProductInCart__img"
                        effect="blur"
                        placeholderSrc="img/placeholder.png"
                      />
                    </Link>

                    <div className="ProductInCart__container">
                      <Link
                        to={`/shop/products/${product.item.slug}`}
                        className="ProductInCart__name"
                      >
                        {product.item.name}
                      </Link>

                      <p className="ProductInCart__price">
                        {`${product.item.price} UAH`}
                      </p>

                      <p className="ProductInCart__size">{product.item.size}</p>

                      <p className="ProductInCart__quantity">
                        {`${product.quantity} × ${Number.parseInt(product.item.price)} UAH`}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="Order__details-delivery">
            <h4 className="Order__details-title">Delivery information:</h4>

            <p className="Order__details-delivery-info">
              {customer_first_name}
            </p>

            <p className="Order__details-delivery-info">{customer_last_name}</p>

            <p className="Order__details-delivery-info">
              {customer_email ? customer_email : ''}
            </p>

            <p className="Order__details-delivery-info">{customer_phone}</p>

            <p className="Order__details-delivery-info">{delivery_city}</p>

            <p className="Order__details-delivery-info">
              {`Nova Post Branch #${delivery_nova_post_department}`}
            </p>
          </div>
        </div>
      )}
    </>
  );
});
