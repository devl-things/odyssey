import React, { useState, useMemo } from 'react';
import { LocalizationContext } from './LocalizationContext'; // Import the LocalizationContext
import { DefaultTranslations } from './translations'; // Import the translations

interface LocalizationProviderProps {
    children: React.ReactNode; // Typing the children prop as React nodes
}

const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState('en'); // Default language
    const translations = DefaultTranslations[language]; // Get translations based on the selected language

    const value = useMemo(() => ({
        language,
        translations,
        setLanguage
    }), [language, translations]);

    return (
        <LocalizationContext.Provider value={value}>
            {children}
        </LocalizationContext.Provider>
    );
};

export default LocalizationProvider;