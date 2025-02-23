import React from 'react';
import { GiGlobe } from "react-icons/gi";
import './LanguageSelector.scss';

const LanguageSelector: React.FC = () => {
    return (
        <div className="language-selector">
            <button >
                <GiGlobe size={24} />
            </button>
        </div>
    );
};

export default LanguageSelector;