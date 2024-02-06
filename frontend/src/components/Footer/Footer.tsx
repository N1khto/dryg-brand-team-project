import { NavLink } from 'react-router-dom';
import './Footer.scss';
import { getNavClassName } from '../../helpers/getNavClassName';
import { INSTA_LINK } from '../../contants/others';
import React from 'react';

export const Footer = React.memo(() => {
  return (
    <footer className="Footer">
      <div className="Footer__container container">
        <div className="Footer__nav">
          <div className="Footer__nav-item">
            <a 
              href={INSTA_LINK} 
              target="_blank"
              rel="noreferrer" 
            >
              instagram
            </a>
          </div>

          <div className="Footer__nav-item">
            <NavLink
              className={getNavClassName}
              to="/delivery"
            >
              delivery and payment
            </NavLink>
          </div>

          <div className="Footer__nav-item">
            <NavLink
              className={getNavClassName}
              to="/exchange"
            >
              exchange and returns
            </NavLink>            
          </div>    
        </div>

        <div className="Footer__rights">
          <div className="icon icon--rights"/>
          <div className="Footer__rights-year">2023</div>
          <div className="Footer__rights-name">ДРУГ</div>
        </div>
      </div>
    </footer>
  );
});
