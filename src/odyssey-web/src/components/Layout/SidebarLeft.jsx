// src/components/Layout/SidebarLeft.js
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const SidebarLeft = ({ isVisible, children }) => {

    return (
        <nav id="sidebar-left" className={`sidebar ${isVisible ? '' : 'collapsed'}`} >
            <div className="sidebar-content">
                {children}
            </div>
        </nav>
    );
};
SidebarLeft.propTypes =
{
    isVisible: PropTypes.bool.isRequired,
}

export default SidebarLeft;
