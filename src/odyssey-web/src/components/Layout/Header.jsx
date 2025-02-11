// src/components/Layout/Header.js
import React from 'react';

const Header = ({ onToggleLeft, onToggleRight }) => {
  return (
    <nav className="navbar navbar-expand navbar-bg">
        <a className="sidebar-toggle" onClick={onToggleLeft}>
          <i className="hamburger align-self-center"></i>
        </a>

        <a className="sidebar-toggle" onClick={onToggleRight}>
          <i className="hamburger hamburger-right align-self-center"></i>
        </a>
    </nav>
  );
};

export default Header;
