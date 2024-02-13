import './ProductList.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <ul className="ProductList">
      {products.map((product) => (
        <li key={product.id} className="ProductList__item">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
