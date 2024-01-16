import React, { useMemo, useState } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../helpers/useLocalStorage';
import { ProductDetails } from '../types/ProductDetails';

type State = {
  cart: ProductDetails[],
  setCart: (favProducts: ProductDetails[]) => void,
  visibleProducts: ProductDetails[],
  countProductInCart: (productId: number) => number,
  handleAddToCart: (product: ProductDetails) => void,
  removeProduct: (productId: number) => void,
  decrease: (productId: number) => void,
  increase: (product: ProductDetails) => void,
  isCartOpen: boolean,
  setIsCartOpen: (value: boolean) => void,
};

export const CartContext = React.createContext<State>({
  cart: [],
  setCart: () => {},
  visibleProducts: [],
  countProductInCart: () => 0,
  handleAddToCart: () => {},
  removeProduct: () => {},
  decrease: () => {},
  increase: () => {},
  isCartOpen: false,
  setIsCartOpen: () => {},
});

interface Props {
  children: React.ReactNode,
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useLocalStorage<ProductDetails[]>('cartDryg', []);
  const [isCartOpen, setIsCartOpen] = useState(false); 

  const idsAdded: number[] = [];

  const visibleProducts = cart.filter(product => {
    if (idsAdded.includes(product.id)) {
      return false;
    }

    idsAdded.push(product.id);

    return true;
  });

  const countProductInCart = (productId: number) => {
    return cart.filter(item => item.id === productId).length;
  };

  const handleAddToCart = (product: ProductDetails) => {
    if (cart.some(item => item.id === product.id)) {
      setCart((currentCart: ProductDetails[]) => (
        currentCart.filter(item => item.id !== product.id)
      ));
    } else {
      setCart((currentFavs: ProductDetails[]) => [...currentFavs, product]);
    }
  };

  const removeProduct = (productId: number) => {
    setCart((currentCart: ProductDetails[]) => (
      currentCart.filter(item => item.id !== productId)
    ));
  };

  const decrease = (productId: number) => {
    setCart((currentCart: ProductDetails[]) => {
      const index = currentCart
        .reverse()
        .findIndex(item => item.id === productId);

      return currentCart
        .slice(0, index)
        .concat(currentCart.slice(index + 1))
        .reverse();
    });
  };

  const increase = (product: ProductDetails) => {
    setCart((currentCart: ProductDetails[]) => [...currentCart, product]);
  };

  const value = useMemo(() => ({
    cart,
    setCart,
    visibleProducts,
    countProductInCart,
    handleAddToCart,
    removeProduct,
    decrease,
    increase,
    isCartOpen,
    setIsCartOpen,
  }), [cart, isCartOpen]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
