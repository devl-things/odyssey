import React, { useContext } from 'react';
import { GiGlobe } from "react-icons/gi";
import { LocalizationContext, LocalizationLang } from '../../contexts/LocalizationContext'; // Import the context
import './LanguageSelector.scss';

const LanguageSelector: React.FC = () => {
    const { language, setLanguage } = useContext(LocalizationContext); // Get language & setLanguage from context

    const handleLanguageChange = () => {
        setLanguage(language === LocalizationLang.en ? LocalizationLang.hr : LocalizationLang.en); // Toggle between English and French
    };

    return (
        <div className="language-selector">
            <button onClick={handleLanguageChange}>
                <GiGlobe size={24} />
            </button>
        </div>
    );
};

export default LanguageSelector;