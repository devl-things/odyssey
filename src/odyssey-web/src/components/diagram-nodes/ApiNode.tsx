import React, { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import OdysseyData from '../../data/odyssey-protocol/OdysseyData';

const handleStyle = { left: 10 };

interface ApiNodeProps {
    data?: OdysseyData;
}

const ApiNode: React.FC<ApiNodeProps> = ({ data }) => {
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    }, []);

    return (
        <>
            <Handle type="target" position={Position.Top} />
            <div>
                <label htmlFor="text">Text:</label>
                <input id="text" name="text" onChange={onChange} className="nodrag" />
            </div>
            <Handle type="source" position={Position.Bottom} id="a" />
            <Handle
                type="source"
                position={Position.Bottom}
                id="b"
                style={handleStyle}
            />
        </>
    );
};

export default ApiNode;