import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import React, { useState } from 'react';
import './MobileMenu.scss';
import { Header } from '../../components/Header';


export const MobileMenu: React.FC = () => {


  return (
    <div className="MobileMenu">

        <nav className="MobileMenu__nav">
          <ul className="MobileMenu__nav-list">
            <li className="MobileMenu__nav-list-item">
              <Link
                to="/shop"
                className="MobileMenu__nav-list-link"
              >
                Shop
              </Link>
            </li>

            <li className="MobileMenu__nav-list-item">
              <Link
                to="/merch"
                className="MobileMenu__nav-list-link"
              >
                Merch
              </Link>
            </li>

            <li className="MobileMenu__nav-list-item">
              <Link
                to="/philosophy"
                className="MobileMenu__nav-list-link"
              >
                Philosophy
              </Link>
            </li>
          </ul>
        </nav>
    </div>
  );
};
