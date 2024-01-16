import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../Logo';
import './Header.scss';
import { getIconNavClassName, getNavClassName } from '../../helpers/getNavClassName';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

type Props = {
  setIsSearchOpen: (value: boolean) => void,
}

export const Header: React.FC<Props> = ({ setIsSearchOpen }) => {
  const { cart, setIsCartOpen } = useContext(CartContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
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
            <button type="button" onClick={() => setIsSearchOpen(true)}>
              <div className="icon icon--search"></div>
            </button>

            <NavLink to="/account" className={getIconNavClassName}>
              <div className="icon icon--account"></div>
            </NavLink>

            <button 
              type="button" 
              onClick={() => setIsCartOpen(true)}
              className="Header__icon"
            >
              <div className="icon icon--cart">
                {!!cart.length && (
                  <div className="Header__icon-cart">
                    <span className="Header__icon-cart-amount">
                      {cart.length}
                    </span>
                  </div>
                )}
              </div>            
            </button>

            {pathname === "/menu" ? (
              <button 
                type="button"
                onClick={() => navigate(-1)}
                className="Header__icon-menu"
              >
                  <div className="icon icon--close"></div>
              </button>
            ) : (
              <Link 
                to="/menu"
                className="Header__icon-menu"
              >
                  <div className="icon icon--menu"></div>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>    
  );
};
