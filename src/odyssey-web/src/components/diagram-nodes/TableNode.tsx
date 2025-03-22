import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { OdysseyNodeProps } from '../../data/odyssey-protocol/OdysseyData';
import './DiagramNodes.scss';
import { FaTable } from "react-icons/fa";

const TableNode: React.FC<OdysseyNodeProps> = ({ data }) => {
    const minHeight = data?.style?.height ? `${data.style.height}px` : 'auto';
    return (
        <div className="table-node" style={{ minHeight }}>
            <div className="table-node-header">
                <div className="node-header-icon-right">
                    <FaTable size={18} />
                </div>
                <div className="node-header-title">
                    <div className="component-node-name" title={data.name} >{data.name}</div>
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

export default TableNode;