import { useNavigate } from 'react-router-dom';
import { AccountTop } from '../../components/AccountTop';
import { BigButton } from '../../components/BigButton';
import { ProductList } from '../../components/ProductList';
import './AccountWishlistPage.scss';
import { useContext } from 'react';
import { FavouritesContext } from '../../context/FavContext';

export const AccountWishlistPage = () => {
  const navigate = useNavigate();
  const { favourites } = useContext(FavouritesContext);

   return (
    <div className="AccountWishlistPage">
      <AccountTop />
      {favourites.length ? (
        <ProductList products={favourites} />
      ) : (
        <>
        <p>You haven't selected anything yet</p>
        <BigButton text="Shop" onClick={() => navigate('/shop')} />
        </>
      )}
    </div>
   );
};
