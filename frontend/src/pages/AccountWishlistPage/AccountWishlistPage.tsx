import { useNavigate } from 'react-router-dom';
import { AccountTop } from '../../components/AccountTop';
import { BigButton } from '../../components/BigButton';
import { ProductList } from '../../components/ProductList';
import './AccountWishlistPage.scss';
import { useEffect, useState } from 'react';
import {  getUserWishlist } from '../../api/user';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';

export const AccountWishlistPage = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true)
    getUserWishlist()
      .then((resp) => {
        setWishlist(resp.user_wishlist)
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      })

  }, [])

    return (
    <div className="AccountWishlistPage">
      <AccountTop />
      
      {isLoading && <Loader />}

      {!isLoading && !!wishlist.length && (
        <ProductList products={wishlist} />
      )}

      {!isLoading && !wishlist.length && (
        <>
        <p className="AccountWishlistPage__text">
          You haven't selected anything yet
        </p>
        <BigButton text="Shop" onClick={() => navigate('/shop')} />
        </>
      )}
    </div>
   );
};
