import { NavLink } from 'react-router-dom';
import './Footer.scss';
import { getNavClassName } from '../../helpers/getNavClassName';

export const Footer = () => {


  return (
    <footer className="Footer">
      <div className="Footer__container container">
        <div className="Footer__nav">
          <div className="Footer__nav-item">
            <a 
              href="https://www.instagram.com/dryg.brand/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA==" 
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
};
