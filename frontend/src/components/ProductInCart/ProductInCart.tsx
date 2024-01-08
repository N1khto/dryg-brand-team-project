import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import './ProductInCart.scss';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

type Props = {
  product: Product,
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
    name,
    images,
    max_price,
    slug
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
            alt={name}
            className="ProductInCart__img"
          />
        </Link>

        

      <div className="ProductInCart__container">
        <Link
          to={`/shop/product/${slug}`} 
          className="ProductInCart__name"
        >
          {name}
        </Link>

        <p className="ProductInCart__price">{`${max_price} UAH`}</p>
        <p className="ProductInCart__size">{size}</p>

        {isCartOpen && <div className="ProductInCart__control">
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
          >
            <div className="icon icon--plus" />
          </button>
        </div>}
        
        {isCartOpen && <button
          type="button"
          className="ProductInCart__remove-button"
          onClick={() => removeProduct(id)}
        >
          <div className="icon icon--remove" />
        </button>}
      </div>
    </div>
  )
}