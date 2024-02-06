import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import './ProductDetailsPage.scss';
import { ProductDetails } from '../../types/ProductDetails';
import { AddToFavButton } from '../../components/AddToFavButton';
import { createSlug } from '../../helpers/helpers';
import { getProductDetails } from '../../api/shop';
import { AddToCartButton } from '../../components/AddToCartButton';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { PRODUCT_HEX } from '../../contants/colors';
import { Loader } from '../../components/Loader';
import { MEDIA_URL } from '../../contants/endpoints';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { NotFoundPage } from '../NotFoundPage';
import classNames from 'classnames';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDetails | null>({
    "id": 6,
    "name": "Coat",
    "category": "Coats",
    "fabric": "Italian wool",
    "description": "",
    "color": "Black",
    "size": {
        "id": 2,
        "tag": "coat size",
        "value": "oversize",
        "length": 100,
        "width": 70
    },
    "slug": "coat-black-oversize",
    "stock": 0,
    "price": "9000.00",
    "stripe_product_id": "price_1OeGXuF3PkC8kkFzZPXhiQSG",
    "date_added": "2024-01-29T13:07:51.687000Z",
    "images": [
        "/media/images/0G5A4181.jpg",
        "/media/images/0G5A4179.jpg",
        "/media/images/0G5A4147.jpg",
        "/media/images/0G5A4072_XTS1XCh.jpg",
        "/media/images/0G5A4073_bnfVn4n.jpg",
        "/media/images/0G5A4075.jpg",
        "/media/images/0G5A4259.jpg"
    ],
    "sizes_available": [
        "oversize"
    ],
    "colors_available": [
        "Black"
    ],
    "wishlist": false
});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadError, setIsLoadError] = useState(false);  

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      getProductDetails(productId)
        .then((response) => {
          setProduct(response);
        })
        .catch(() => {
          setIsLoadError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [productId]);


  if (!product) {
    return (
      <>
        {!isLoading && <NotFoundPage />}
        {isLoading && <Loader />}
      </>
    );
  }

  const {
    name,
    category,
    color,
    size,
    price,
    images,
    fabric,
    sizes_available,
    colors_available,   
  } = product;


  return (
    <div className="ProductDetailsPage">
      <BreadCrumbs product={product} />

      {isLoading && <Loader />}

      {!isLoading && (
        <div className="ProductDetailsPage__container">
          <div className="ProductDetailsPage__wrapper">
            <ul className="ProductDetailsPage__images">
              {images.map(image => (
                <li key={image} className="ProductDetailsPage__images-item">
                  <div className={classNames({'out-of-stock': !product.stock})}></div>
                  <LazyLoadImage
                    src={MEDIA_URL + image}
                    alt={name}
                    className="ProductDetailsPage__images-img"
                    wrapperClassName="ProductDetailsPage__images-img"
                    effect="blur"
                    placeholderSrc="img/placeholder.png"
                  />
                </li>          
              ))}
            </ul>
          </div>          

          <div className="ProductDetailsPage__content">
            <h1 className="ProductDetailsPage__title">{`${name}`}</h1>
            <p className="ProductDetailsPage__price">{`${Number.parseInt(price)} UAH`}</p>

            <div className="ProductDetailsPage__colors">
              <p className="ProductDetailsPage__subtitle">Color</p>
              <ul className="ProductDetailsPage__colors-list">
                {colors_available.map(colorValue => (
                  <li
                    key={colorValue}
                    className={cn('ProductDetailsPage__colors-item', {
                      'item-active': color === colorValue,
                    })}
                  >
                    <Link
                      style={{
                        backgroundColor: PRODUCT_HEX[colorValue],
                      }}
                      to={(`/shop/products/${colorValue}-${createSlug(category)}-${colorValue}-${size.value}`)
                        .toLowerCase()}
                      className="ProductDetailsPage__colors-link"
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="ProductDetailsPage__sizes">
              <p className="ProductDetailsPage__subtitle">Size</p>
              <ul className="ProductDetailsPage__sizes-list">
                {sizes_available.map(sizeValue => (
                  <li
                    key={sizeValue}
                    className={cn('ProductDetailsPage__sizes-item', {
                      'item-active': size.value === sizeValue,
                    })}
                  >
                    <Link                      
                      to={(`/shop/products/${color}-${createSlug(category)}-${color}-${sizeValue}`)
                        .toLowerCase()}
                      className="ProductDetailsPage__sizes-link"
                    >
                      {sizeValue}
                    </Link>
                  </li>
                ))}
              </ul>

              {size.length && (
                <p className="ProductDetailsPage__sizes-length">
                  {`Length: ${size.length} cm`}
                </p>
              )}
              {size.width && (
                <p className="ProductDetailsPage__sizes-width">
                  {`Width: ${size.width} cm`}
                </p>
              )}
            </div>

            <div className="ProductDetailsPage__fabric">
              <p className="ProductDetailsPage__subtitle">Fabric</p>
              <p className="ProductDetailsPage__fabric-info">{fabric}</p>
            </div>

            <div className="ProductDetailsPage__buttons">
              <AddToCartButton product={product}/>
              <div className="ProductDetailsPage__buttons-fav">
                <AddToFavButton product={product} />
              </div>                
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
