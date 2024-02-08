import React from 'react';
import { NavLink } from 'react-router-dom';
import './LoginPage.scss';

import { getLoginNavClassName } from '../../helpers/getNavClassName';
import { LoginForm } from '../../components/LoginForm/LoginForm';

export const LoginPage = React.memo(() => {
  return (
    <div className="LoginPage">
      <div className="LoginPage__photo"></div>

      <div className="LoginPage__content">
        <div className="LoginPage__nav">
          <NavLink to="/account/login" className={getLoginNavClassName}>
            Login
          </NavLink>
          <NavLink to="/account/createAccount" className={getLoginNavClassName}>
            Create Account
          </NavLink>
        </div>

        <LoginForm />
      </div>
    </div>
  );
});
