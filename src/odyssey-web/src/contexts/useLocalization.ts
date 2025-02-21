import { useContext } from 'react';
import { LocalizationContext } from './LocalizationContext'; // Import the LocalizationContext

// Custom hook to use the localization context
export const useLocalization = () => {
    const context = useContext(LocalizationContext);

    if (!context) {
        throw new Error('useLocalization must be used within a LocalizationProvider');
    }

    return context;
};
