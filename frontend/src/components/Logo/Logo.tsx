import React from 'react';
import './Logo.scss';

export const Logo = React.memo(() => (
  <a href="/" className="Logo">
    <div className="Logo__img" />
  </a>
));
