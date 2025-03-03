import React, { useState, useRef, useCallback } from 'react';

interface LabelInputComponentProps {
    labelText: string;
    placeholder?: string;
}

const LabelInputComponent: React.FC<LabelInputComponentProps> = ({ labelText, placeholder = "Type something..." }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [isBold, setIsBold] = useState<boolean>(false);
    console.log("sfs");
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        if (newValue !== '' && !isBold) {
            setIsBold(true);
        } else if (newValue === '' && isBold) {
            setIsBold(false);
        }
    }, [isBold]);

    return (
        <div>
            <label
                htmlFor="myInput"
                style={{ fontWeight: isBold ? 'bold' : 'normal' }}
            >
                {labelText}
            </label>
            <input
                id="myInput"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default LabelInputComponent;
