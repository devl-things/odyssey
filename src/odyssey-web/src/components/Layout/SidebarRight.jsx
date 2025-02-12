// src/components/Layout/SidebarRight.js
import React from 'react';

const SidebarRight = ({ isVisible, children }) => {

    return (
        <nav id="sidebar-right" className={`sidebar ${isVisible ? '' : 'collapsed'}`} >
            <div className="sidebar-content">
                {children}
            </div>
        </nav>
    );
};

export default SidebarRight;
