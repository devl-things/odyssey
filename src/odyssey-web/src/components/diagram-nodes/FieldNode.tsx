import React from 'react';
import { Handle, Position } from '@xyflow/react';
import NodeField from '../../data/odyssey-protocol/NodeField';
import { createHandleSourceId, createHandleTargetId } from './IdFactory';
import './DiagramNodes.scss';

interface FieldNodeProps {
    data: NodeField;
}

const FieldNode: React.FC<FieldNodeProps> = ({ data }) => {
    return (
        <div className="field-node">
            {data &&
                <>
                    <Handle
                        type="target"
                        position={Position.Left}
                        id={createHandleTargetId(data.name)}
                        isConnectable={true}
                    />
                    <div className="field-node-content">
                        <div className={`field-node-content-pk ${data.primaryKey ? '' : 'no-pk'}`}>PK</div>
                        <div className="field-node-content-name" title={data.name}>{data.name}</div>
                        {/* <span className="data-type-node-attribute">{data.type}</span> */}
                    </div>
                    <Handle
                        type="source"
                        position={Position.Right}
                        id={createHandleSourceId(data.name)}
                        isConnectable={true}
                    />
                </>}
        </div>
    );
};

export default FieldNode;