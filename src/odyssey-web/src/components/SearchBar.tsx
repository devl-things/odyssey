import React from 'react';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search projects…" aria-label="Search" />
            <button type="button">
                <Search size="20" color="#6C757D" />
            </button>
        </div>
    );
}

export default SearchBar;