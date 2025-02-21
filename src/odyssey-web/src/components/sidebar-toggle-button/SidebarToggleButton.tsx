import React from 'react';
import './SidebarToggleButton.scss';

interface SidebarToggleButtonProps {
    position: 'left' | 'right'; // Determines whether it's for the left or right sidebar
    onClick: () => void;        // The click handler for the button
}

const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({ position, onClick }) => {
    return (
        <button className={`sidebar-toggle ${position}`} onClick={onClick}>
            <i className={`hamburger ${position === 'right' ? 'hamburger-right' : ''} align-self-center`} />
        </button>
    );
};

export default SidebarToggleButton;
