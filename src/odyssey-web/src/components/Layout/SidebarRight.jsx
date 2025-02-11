// src/components/Layout/SidebarRight.js
import React from 'react';

const SidebarRight = ({ isVisible, children }) => {

  return (
    <nav id="sidebar-right" className={`sidebar ${isVisible ? '' : 'collapsed'}`} data-sidebar-side="right">
        <div className="sidebar-content">
            <h3>Right Sidebar</h3>
            <div>
                {children}
            </div>
        </div>
    </nav>
);
};

export default SidebarRight;
