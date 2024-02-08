import { Link, NavLink } from 'react-router-dom';
import React, { useContext } from 'react';
import './AccountTop.scss';

import { getLoginNavClassName } from '../../helpers/getNavClassName';
import { AuthContext } from '../../context/AuthContext';

export const AccountTop = React.memo(() => {
  const { userLogout, authUser } = useContext(AuthContext);

  const handleLogout = () => {
    userLogout();
  };

  return (
    <div className="AccountTop">
      <h1 className="AccountTop__title">My Account</h1>

      <div className="AccountTop__greet">
        <p className="AccountTop__greet-text">
          {`Welcome, ${authUser?.first_name ? authUser.first_name : 'friend'}!`}
        </p>
        <Link
          to="/account/login"
          className="AccountTop__greet-logout"
          onClick={handleLogout}
        >
          Log out
        </Link>
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
