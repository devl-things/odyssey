import React from 'react';
import { Handle, Position } from '@xyflow/react';
import OdysseyData from '../../data/odyssey-protocol/OdysseyData';
import './DiagramNodes.scss';
import { LuComponent } from "react-icons/lu";

interface ComponentNodeProps {
    data?: OdysseyData;
}

const ComponentNode: React.FC<ComponentNodeProps> = ({ data }) => {
    const minHeight = data?.style?.height ? `${data.style.height}px` : 'auto';
    return (
        <div className="api-node" style={{ minHeight }}>
            <div className="node-header">
                <div className="api-node-title">
                    <div className="api-node-title-url" title={data.name} >{data.name}</div>
                    <div>
                        <img src="https://robohash.org/dog" alt={data.name} width="50" height="50" />
                    </div>

                    {/* <div><span className="api-node-title-method">{data.method}</span></div> */}
                </div>
                <div className="node-icon">
                    <LuComponent size={24} />
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

export default ComponentNode;