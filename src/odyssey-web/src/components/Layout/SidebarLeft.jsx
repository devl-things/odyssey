// src/components/Layout/SidebarLeft.js
import {useEffect} from 'react';

const SidebarLeft = ({ isVisible, children }) => {

    return (
        <nav id="sidebar-left" className={`sidebar ${isVisible ? '' : 'collapsed'}`} data-sidebar-side="left">
            <div className="sidebar-content">
                <h3>Left Sidebar</h3>
                <div>
                    {children}
                </div>
            </div>
        </nav>
    );
};

export default SidebarLeft;
