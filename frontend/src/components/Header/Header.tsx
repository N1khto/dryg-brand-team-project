import { Link, NavLink } from 'react-router-dom';
import { Logo } from '../Logo';
import './Header.scss';
import { getNavClassName } from '../../helpers/getNavClassName';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

export const Header = () => {
  const {setIsCartOpen} = useContext(CartContext);

  return (
    <header className="Header" id="header">
      <div className="Header__container container">
        <div className="Header__logo">
          <Logo />
        </div>

        <nav className="Header__navigation">
            <ul className="Header__navigation-list">
              <li className="Header__navigation-item">
                <NavLink
                  className={getNavClassName}
                  to="/shop"
                >
                  shop
                </NavLink>
              </li>

              <li className="Header__navigation-item">
                <NavLink
                  className={getNavClassName}
                  to="/merch"
                >
                  merch
                </NavLink>
              </li>

              <li className="Header__navigation-item">
                <NavLink
                  className={getNavClassName}
                  to="/philosophy"
                >
                  philosophy
                </NavLink>
              </li>
            </ul>
          </nav>

        <div className="Header__right">
          <button type="button">
            <div className="icon icon--search"></div>
          </button>

          <Link to="/account">
            <div className="icon icon--account"></div>
          </Link>

          <button type="button" onClick={() => setIsCartOpen(true)}>
            <div className="icon icon--cart"></div>
          </button>
        </div>
      </div>
    </header>
  );
};
