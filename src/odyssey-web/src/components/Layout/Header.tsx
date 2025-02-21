import React from 'react';
import SearchBar from '../search-bar/SearchBar';

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
            <button className="sidebar-toggle left" onClick={onToggleLeft}>
                <i className="hamburger align-self-center"></i>
            </button>

            <button className="sidebar-toggle right" onClick={onToggleRight}>
                <i className="hamburger hamburger-right align-self-center"></i>
            </button>

            <SearchBar onSearch={handleOnSearch} />
        </nav>
    );
};

export default Header;
