import { Link } from 'react-router-dom';
import './ProductInCart.scss';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { ProductDetails } from '../../types/ProductDetails';

type Props = {
  product: ProductDetails,
  isCartOpen: boolean,
}

export const ProductInCart:React.FC<Props> = ({product, isCartOpen}) => {
  const {
    countProductInCart,
    removeProduct,
    decrease,
    increase,
  } = useContext(CartContext);

  const {
    id,
    model,
    images,
    price,
    slug,
    stock
  } = product;

  const size = slug.split('-')[2];
  

  return (
    <div key={id} className="ProductInCart">
        <Link 
          to={`/shop/product/${slug}`} 
          className="ProductInCart__photo"
        >
          <img
            src={`${images[0]}`}
            alt={model.name}
            className="ProductInCart__img"
          />
        </Link>

        

      <div className="ProductInCart__container">
        <Link
          to={`/shop/product/${slug}`} 
          className="ProductInCart__name"
        >
          {model.name}
        </Link>

        <p className="ProductInCart__price">{`${price} UAH`}</p>
        <p className="ProductInCart__size">{size}</p>

        {isCartOpen ? (
        <div className="ProductInCart__control">
          <button
            type="button"
            className="ProductInCart__control-button"
            onClick={() => decrease(id)}
            disabled={countProductInCart(id) === 1}
          >
            <div className="icon icon--minus" />
          </button>

          <p className="ProductInCart__control-amount">
            {countProductInCart(id)}
          </p>

          <button
            type="button"
            className="ProductInCart__control-button"
            onClick={() => increase(product)}
            disabled={countProductInCart(id) === stock}
          >
            <div className="icon icon--plus" />
          </button>
        </div>
        ) : (
          <p className="ProductInCart__quantity">{`${countProductInCart(id)}0 × ${price} UAH`}</p>
        )}
        
        {isCartOpen && <button
          type="button"
          className="ProductInCart__remove-button"
          onClick={() => removeProduct(id)}
        >
          <div className="icon icon--remove" />
        </button>}
      </div>
    </div>
  );
};
 