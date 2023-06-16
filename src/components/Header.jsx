import React from 'react';

import logoHeader from '../images/logo-header.svg';
function Header() {
  return (
    <header className="header">
      <img src={logoHeader} className="header__logo" alt="логотип сайта" />
    </header>
  );
}

export default Header;
