import React from 'react';
import './Sidebar.scss';

interface SidebarProps {
    isVisible: boolean;
    children: React.ReactNode;
    position: 'left' | 'right'; // Enforcing that position can only be 'left' or 'right'
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible, children, position }) => {
    return (
        <nav id={`sidebar-${position}`} className={`sidebar ${isVisible ? '' : 'collapsed'}`}>
            <div className="sidebar-content">
                {children}
            </div>
        </nav>
    );
};

export default Sidebar;
