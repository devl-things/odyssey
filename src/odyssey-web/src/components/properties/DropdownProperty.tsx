import React, { memo, useEffect, useState } from "react";
import DiagramNode from "../../data/odyssey-protocol/DiagramNode";
import './Properties.scss';

interface DropdownPropertyProps<T extends string> {
    label: string;
    name: keyof DiagramNode;
    value?: T;
    options: readonly T[];
    onChange: (field: keyof DiagramNode, value: T) => void;
    saved?: boolean;
}

const DropdownProperty = <T extends string>({ label, name, value, options, onChange, saved }: DropdownPropertyProps<T>) => {
    const [isModified, setIsModified] = useState(false);

    useEffect(() => {
        setIsModified(false);
    }, [saved]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(name, e.target.value as T);
        setIsModified(true);
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
