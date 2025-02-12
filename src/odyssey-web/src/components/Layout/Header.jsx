import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ onToggleLeft, onToggleRight }) => {
    return (
        <nav className="navbar navbar-expand navbar-bg">
            <a className="sidebar-toggle left" onClick={onToggleLeft}>
                <i className="hamburger align-self-center"></i>
            </a>

            <a className="sidebar-toggle right" onClick={onToggleRight}>
                <i className="hamburger hamburger-right align-self-center"></i>
            </a>
        </nav>
    );
};

Header.propTypes = {
    onToggleLeft: PropTypes.func.isRequired,  // Expecting a function for the left sidebar toggle
    onToggleRight: PropTypes.func.isRequired, // Expecting a function for the right sidebar toggle
};

export default Header;
