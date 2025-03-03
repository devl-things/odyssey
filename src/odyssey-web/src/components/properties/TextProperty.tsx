import React, { memo } from "react";
import './Properties.scss';

interface TextPropertyProps {
    label: string;
    name: string;
    value?: string;
    isModified: boolean,
    onChange: (field: string, value: string) => void;
}

const TextProperty: React.FC<TextPropertyProps> = ({ label, name, value, isModified = false, onChange }) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(name, e.target.value);
    };

    return (
        <>
            <p className={`${isModified ? "modified" : ""}`}>{label}</p>
            <input
                type="text"
                value={value || ""}
                onChange={handleInputChange}
            />
        </>
    );
};

export default memo(TextProperty);