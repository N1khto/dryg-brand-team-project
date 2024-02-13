import React from 'react';
import { Link } from 'react-router-dom';
import './MobileMenu.scss';

export const MobileMenu = React.memo(() => {
  return (
    <div className="MobileMenu">
      <nav className="MobileMenu__nav">
        <ul className="MobileMenu__nav-list">
          <li className="MobileMenu__nav-list-item1">
            <Link to="/shop" className="MobileMenu__nav-list-link">
              Shop
            </Link>
          </li>

          <li className="MobileMenu__nav-list-item2">
            <Link to="/merch" className="MobileMenu__nav-list-link">
              Merch
            </Link>
          </li>

          <li className="MobileMenu__nav-list-item3">
            <Link to="/philosophy" className="MobileMenu__nav-list-link">
              Philosophy
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
});
