import React from 'react';
import SearchBar from '../search-bar/SearchBar';
import SidebarToggleButton from '../sidebar-toggle-button/SidebarToggleButton';
import './Header.scss'
import LanguageSelector from '../language-selector/LanguageSelector';

interface HeaderProps {
    onToggleLeft: () => void;  // Expecting a function for the left sidebar toggle
    onToggleRight: () => void; // Expecting a function for the right sidebar toggle
}

const Header: React.FC<HeaderProps> = ({ onToggleLeft, onToggleRight }) => {
    const handleOnSearch = (query: string) => {
        console.log(query);
    }
    return (
        <nav className="header">
            {/* //<div className="header-left"> */}
            <SidebarToggleButton position="left" onClick={onToggleLeft} />
            <SidebarToggleButton position="right" onClick={onToggleRight} />

            <SearchBar onSearch={handleOnSearch} />
            {/* </div> */}

            <div className="header-title">
                Odyssey
            </div>
            <LanguageSelector />
        </nav>
    );
};

export default Header;
