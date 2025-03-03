import React, { memo, useEffect, useRef, useState } from "react";
import DiagramNode from "../../data/odyssey-protocol/DiagramNode";
import './Properties.scss';

interface TextPropertyProps {
    label: string;
    name: keyof DiagramNode;
    value?: string;
    onChange: (field: keyof DiagramNode, value: string) => void;
    saved?: boolean;
}

const TextProperty: React.FC<TextPropertyProps> = ({ label, name, value, onChange, saved }) => {
    const [isModified, setIsModified] = useState(false);
    const initialValueRef = useRef(value);
    console.log("ref ", initialValueRef);
    useEffect(() => {
        setIsModified(false);
        initialValueRef.current = value;
    }, [saved]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(name, newValue);
        setIsModified(newValue !== initialValueRef.current);
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