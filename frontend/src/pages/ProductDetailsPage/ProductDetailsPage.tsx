import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import './ProductDetailsPage.scss';
import { ProductDetails } from '../../types/ProductDetails';
import { AddToFavButton } from '../../components/AddToFavButton';
import { Product } from '../../types/Product';
import { getProductById } from '../../helpers/helpers';
import { getProductDetails, getProducts, toggleWhishilist } from '../../api/shop';
import { AddToCartButton } from '../../components/AddToCartButton';
import { BreadCrumbs } from '../../components/BreadCrumbs';
// import productExample from '../../data/products/beige-hoodie-beige.json';
import { PRODUCT_HEX } from '../../contants/colors';
import { Loader } from '../../components/Loader';
import { MEDIA_URL } from '../../contants/endpoints';
// import productExample from '../../data/products/pink-cropTopAndShort-pink.json';
// import productExample from '../../data/products/pistachio-tShirt-pistachio.json';



export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDetails | null>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadError, setIsLoadError] = useState(false);  

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      getProductDetails(productId)
        .then((response) => {
          setProduct(response);
          console.log(response)
        })
        .catch(() => {
          setIsLoadError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [productId]);


  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((e) => console.log(e))
  }, []);


  const productInList = product ? getProductById(products, product.id) : null;

  if (!product) {
    return (
      <>
        {!isLoading && <p>No such product</p>}
        {isLoading && <Loader />}
      </>
    );
  }

  const {
    id,
    model,
    color,
    size,
    price,
    images,
    sizes_available,
    colors_available,   
    } = product;

    const handleAddToFav = () => {
      toggleWhishilist(id)
        .then(() => {
          setProduct({
            ...product,
            wishlist: !product.wishlist
          })
        })
        .catch((e) => {
          console.log(e)
        })
    }
  


  return (
    <div className="ProductDetailsPage">
      <BreadCrumbs product={product} />
      <div className="ProductDetailsPage__container">
        <div className="ProductDetailsPage__wrapper">
          <ul className="ProductDetailsPage__images">
            {images.map(image => (
              <li key={image} className="ProductDetailsPage__images-item">
                <img             
                  src={MEDIA_URL + image} 
                  alt={model.name} 
                  className="ProductDetailsPage__images-img" 
                />
              </li>          
            ))}
          </ul>
        </div>
        

        <div className="ProductDetailsPage__content">
          <h1 className="ProductDetailsPage__title">{`${model.name}`}</h1>
          <p className="ProductDetailsPage__price">{`${price} UAH`}</p>

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
                    to={`/shop/products/${model.slug}`}
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
                    to={`/shop/${model.slug}`}
                    className="ProductDetailsPage__sizes-link"
                  >
                    {sizeValue}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="ProductDetailsPage__sizes-length">{`Length: ${size.length} cm`}</p>
            <p className="ProductDetailsPage__sizes-width">{`Width: ${size.width} cm`}</p>
          </div>

          <div className="ProductDetailsPage__fabric">
            <p className="ProductDetailsPage__subtitle">Fabric</p>
            <p className="ProductDetailsPage__fabric-info">{model.fabric}</p>
          </div>

          <div className="ProductDetailsPage__buttons">
            <AddToCartButton product={product}/>
            <div className="ProductDetailsPage__buttons-fav">
              <AddToFavButton product={product} />
            </div>                
          </div>
        </div>
      </div>
    </div>
  );
};
