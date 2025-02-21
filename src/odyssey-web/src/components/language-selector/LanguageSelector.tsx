import React from 'react';
import { Globe } from 'lucide-react'; // Example icon, you can use any icon library
import './LanguageSelector.scss';

const LanguageSelector: React.FC = () => {
    return (
        <div className="language-selector">
            <button >
                <Globe size={24} />
            </button>
        </div>
    );
};

export default LanguageSelector;