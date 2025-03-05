import React, { memo } from "react";
import './Properties.scss';

interface ReadOnlyProps {
    label: string;
    value?: string;
}

const ReadOnlyProperty: React.FC<ReadOnlyProps> = ({ label, value }) => {
    return (
        <>
            <p>{label}</p>
            <input
                disabled
                type="text"
                value={value || ""}
            />
        </>
    );
};

export default memo(ReadOnlyProperty);