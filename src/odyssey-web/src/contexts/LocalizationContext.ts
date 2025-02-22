import { createContext } from 'react';
import { DefaultTranslations, Translations } from './translations'; // Import the DefaultTranslations

// Define the structure of the context's value
export interface LocalizationContextProps {
    language: string;
    translations: Translations[keyof Translations];
    setLanguage: (lang: string) => void;
}

// Default context value
const defaultContextValue: LocalizationContextProps = {
    language: 'en', // Default language
    translations: DefaultTranslations['en'], // Default translations for 'en'
    setLanguage: () => { } // Empty function to avoid errors if the context is accessed directly
};

// Create the context with a default value
export const LocalizationContext = createContext<LocalizationContextProps>(defaultContextValue);
