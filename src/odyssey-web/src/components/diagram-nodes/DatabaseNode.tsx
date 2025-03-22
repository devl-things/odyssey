import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { OdysseyNodeProps } from '../../data/odyssey-protocol/OdysseyData';
import './DiagramNodes.scss';
import { LuDatabase } from "react-icons/lu";


const DatabaseNode: React.FC<OdysseyNodeProps> = ({ data }) => {
    const minHeight = data?.style?.height ? `${data.style.height}px` : 'auto';
    return (
        <div className="node-frame" style={{ minHeight }}>
            <div className="node-header">
                <div className="node-header-title">
                    <div className="component-node-name" title={data.name} >{data.name}</div>
                    <div className="api-node-title-url" title={data.url} >{data.url}</div>
                </div>
                <div className="node-header-icon">
                    <LuDatabase size={24} />
                </div>
            </div>
            <Handle
                type="target"
                position={Position.Left}
                id="f1-in"
                isConnectable={true} />
            <Handle
                type="source"
                position={Position.Right}
                id="f1-in"
                isConnectable={true} />

        </div>
    );
};

export default DatabaseNode;