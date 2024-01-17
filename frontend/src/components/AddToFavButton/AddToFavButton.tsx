import cn from 'classnames';
import { Product } from '../../types/Product';
import './AddToFavButton.scss';
import { toggleWhishilist } from '../../api/shop';
import { FormEvent, useContext, useState } from 'react';
import { ProductDetails } from '../../types/ProductDetails';
import { AuthContext } from '../../context/AuthContext';

type Props = {
  product: Product | ProductDetails,
  setIsAddedModalOpen?: (value: boolean) => void,
  setIsRemovedModalOpen?: (value: boolean) => void,
};

export const AddToFavButton: React.FC<Props> = ({ product,setIsAddedModalOpen = () => {}, setIsRemovedModalOpen= () => {}}) => {
  const [isAdded, setIsAdded] = useState(product.wishlist);
  const { authUser, setIsLoginModalOpen } = useContext(AuthContext);

  const handleAddToFav = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (authUser) {
      toggleWhishilist(product.id)
      .then(() => {
        if(isAdded) {
          setIsRemovedModalOpen(true)
        } else {
          setIsAddedModalOpen(true)
        }
        setIsAdded(!isAdded)
      })
      .catch((e) => {
        console.log(e)
      })
    } else {
      setIsLoginModalOpen(true)
    }
  }

  return (
    <>
      <button
        type="button"
        className="AddToFavButton"
        onClick={(e) => handleAddToFav(e)} 
      > 
        <div className={cn('icon', {
          'icon--favourites': !isAdded,
          'icon--favourites-added': isAdded,
        })}
        />
      </button>      
    </>
  );
};
