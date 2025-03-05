import React, { memo } from "react";
import './Properties.scss';

interface DropdownPropertyProps<T extends string> {
    label: string;
    name: string;
    value?: T;
    options: readonly T[];
    isModified: boolean,
    onChange: (field: string, value: T) => void;
}

const DropdownProperty = <T extends string>({ label, name, value, options, isModified = false, onChange }: DropdownPropertyProps<T>) => {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(name, e.target.value as T);
    };

    return (
        <>
            <p className={`${isModified ? "modified" : ""}`}>{label}</p>
            <select value={value || ""} onChange={handleSelectChange}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </>
    );
};

export default memo(DropdownProperty) as typeof DropdownProperty;
