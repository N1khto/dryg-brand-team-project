import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import './ProductDetailsPage.scss';
import { ProductDetails } from '../../types/ProductDetails';
import { AddToFavButton } from '../../components/AddToFavButton';
import { Product } from '../../types/Product';
import { getProductById } from '../../helpers/helpers';
import { getProductDetails, getProducts } from '../../api/shop';
import { AddToCartButton } from '../../components/AddToCartButton';
import { FavouritesContext } from '../../context/FavContext';
import initialProducts from '../../data/products.json';
import { BreadCrumbs } from '../../components/BreadCrumbs';
// import productExample from '../../data/products/beige-hoodie-beige.json';
import { PRODUCT_HEX } from '../../contants/colors';
import { Loader } from '../../components/Loader';
import { MEDIA_URL } from '../../contants/endpoints';
// import productExample from '../../data/products/pink-cropTopAndShort-pink.json';
// import productExample from '../../data/products/pistachio-tShirt-pistachio.json';



export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { favourites, setFavourites } = useContext(FavouritesContext);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [products, setProducts] = useState<Product[]>(initialProducts);
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

  const handleAddToFav = (product: Product) => {
    if (favourites.some(fav => fav.id === product.id)) {
      setFavourites((currentFavs: Product[]) => (
        currentFavs.filter(fav => fav.id !== product.id)        
      ))
    } else {
      setFavourites((currentFavs: Product[]) => [...currentFavs, product]);
    }
  };

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
    model,
    color,
    size,
    price,
    images,
    fabric,
    sizes_available,
    colors_available,   
    } = product;

  // const category = createSlug(model.split(' ').slice(1))

  return (
    <div className="ProductDetailsPage">
      <BreadCrumbs product={product} />
      <div className="ProductDetailsPage__container">
        <ul className="ProductDetailsPage__images">
          {images.map(image => (
            <li key={image}>
              <img             
              src={MEDIA_URL + image} 
              alt={model.name} 
              className="ProductDetailsPage__images-item" 
            />
            </li>          
          ))}
        </ul>

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
            <p className="ProductDetailsPage__fabric-info">{fabric}</p>
          </div>

          {productInList && (
              <div className="ProductDetailsPage__buttons">
                <AddToCartButton product={product}/>
                <div className="ProductDetailsPage__buttons-fav">
                  <AddToFavButton product={productInList} handleAddToFav={handleAddToFav}/>
                </div>                
              </div>
            )}                        
        </div>
      </div>
    </div>
  );
};
