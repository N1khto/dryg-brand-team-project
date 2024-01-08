import React, { useMemo, useState } from 'react';
import { Product } from '../types/Product';
import { useLocalStorage } from '../helpers/useLocalStorage';

type State = {
  favourites: Product[],
  setFavourites: (favProducts: Product[]| ((favProducts: Product[]) => Product[])) => void,
  // handleAddToFav: (product: Product) => void,
  // isAddedModalOpen: boolean,
  // setIsAddedModalOpen: (value: boolean) => void,
  // isRemovedModalOpen: boolean,
  // setIsRemovedModalOpen: (value: boolean) => void,
};

export const FavouritesContext = React.createContext<State>({
  favourites: [],
  setFavourites: () => {},
  // handleAddToFav: () => {},
  // isAddedModalOpen: false,
  // setIsAddedModalOpen: () => {},
  // isRemovedModalOpen: false,
  // setIsRemovedModalOpen: () => {},
});

interface Props {
  children: React.ReactNode,
}

export const FavouritesProvider: React.FC<Props> = ({ children }) => {
  const [
    favourites,
    setFavourites,
  ] = useLocalStorage<Product[]>('favouritesDryg', []);
  // const [isAddedModalOpen, setIsAddedModalOpen] = useState(false);
  // const [isRemovedModalOpen, setIsRemovedModalOpen] = useState(false);

  // const handleAddToFav = (product: Product) => {
  //   setIsAddedModalOpen(false)
  //   setIsRemovedModalOpen(false)
  //   if (favourites.some(fav => fav.id === product.id)) {
  //     setFavourites((currentFavs: Product[]) => (
  //       currentFavs.filter(fav => fav.id !== product.id)        
  //     ))
  //     setIsRemovedModalOpen(true)
  //   } else {
  //     setFavourites((currentFavs: Product[]) => [...currentFavs, product]);
  //     setIsAddedModalOpen(true);
  //   }
  // };

  const value = useMemo(() => ({
    favourites,
    setFavourites,
    // handleAddToFav,
    // isAddedModalOpen,
    // setIsAddedModalOpen,
    // isRemovedModalOpen,
    // setIsRemovedModalOpen,
  }), [favourites]);

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
};
