import { NavLink, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import './AccountTop.scss';

import { getLoginNavClassName } from '../../helpers/getNavClassName';
import { AuthContext } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';

export const AccountTop = React.memo(() => {
  const { userLogout, authUser } = useContext(AuthContext);
  const { setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout().then(() => {
      setCart([]);
      navigate('/account/login');
    });
  };

  return (
    <div className="AccountTop">
      <h1 className="AccountTop__title">My Account</h1>

      <div className="AccountTop__greet">
        <p className="AccountTop__greet-text">
          {`Welcome, ${authUser?.first_name ? authUser.first_name : 'friend'}!`}
        </p>
        <button
          type="button"
          className="AccountTop__greet-logout"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>

      <div className="AccountTop__nav">
        <NavLink to="/account/details" className={getLoginNavClassName}>
          Account details
        </NavLink>
        <NavLink to="/account/history" className={getLoginNavClassName}>
          Order history
        </NavLink>
        <NavLink to="/account/wishlist" className={getLoginNavClassName}>
          Wishlist
        </NavLink>
      </div>
    </div>
  );
});
