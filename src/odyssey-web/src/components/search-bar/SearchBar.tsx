import React, { useState } from 'react';
import { LuSearch } from "react-icons/lu";
import { useLocalization } from '../../contexts/useLocalization';
import './SearchBar.scss';

interface SearchBarProps {
    onSearch: (query: string) => void;  // Define handleSearch as a function that takes a string (query)
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { translations } = useLocalization();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearchClick();  // Trigger search when Enter is pressed
        }
    };

    const handleSearchClick = () => {
        onSearch(searchQuery);  // Pass the current query value to the parent
    };

    return (
        <div className="search-bar">
            <input type="text" placeholder={translations.searchBarPlaceholder} aria-label="Search" value={searchQuery} onChange={handleInputChange} onKeyDown={handleKeyDown} />
            <button type="button" onClick={handleSearchClick}>
                <LuSearch size="20" color="var(--search-bar-color)" />
            </button>
        </div>
    );
}

export default SearchBar;