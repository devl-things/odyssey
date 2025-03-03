import React, { useEffect, useCallback, useState } from "react";
import DiagramNode from "../../data/odyssey-protocol/DiagramNode";
import './Properties.scss';

interface PropertyProps {
    label?: string;
    name?: keyof DiagramNode;
    value?: string | undefined;
    onChange: (field: keyof DiagramNode, value: string) => void;
    saved?: boolean;
}

const TextProperty: React.FC<PropertyProps> = ({ value, onChange, saved }) => {
    const [isModified, setIsModified] = useState(false);

    // useEffect(() => {
    //     setIsModified(false);
    // }, [saved]);
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        //TODO first time on change the bold letters blink
        // onChange(name, e.target.value);
        setIsModified(true);
    }, [isModified]);

    return (
        <>
            <p className={`${isModified ? "modified" : ""}`}>LAbel</p>
            <input
                type="text"
                value="somethign"
                // value={value || ""}
                //onKeyUp={handleInputChange}
                onChange={handleInputChange}
            />
        </>
    );
};

export default TextProperty;