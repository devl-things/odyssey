import React, { useCallback, useMemo } from 'react';
import { Handle, Position } from '@xyflow/react';
import NodeField from '../../data/odyssey-protocol/NodeField';
import { createHandleSourceId, createHandleTargetId } from './IdFactory';
import { useLocalization } from '../../contexts/useLocalization';
import './DiagramNodes.scss';

interface FieldNodeProps {
    data: NodeField;
}
interface PKData {
    title: string,
    value: string
}

const FieldNode: React.FC<FieldNodeProps> = ({ data }) => {
    const { translations } = useLocalization();
    const getPkData = useCallback((isPrimaryKey: boolean, isRequired: boolean): PKData => {
        if (isPrimaryKey) {
            return {
                title: translations.primaryKey,
                value: "PK"
            };
        } else if (isRequired) {
            return {
                title: translations.required,
                value: "*"
            };
        }
        return {
            title: translations.optional,
            value: "O"
        };
    }, [translations.primaryKey, translations.required, translations.optional]);
    const { title: pkTitle, value: pkValue } = useMemo(() =>
        getPkData(data.isPrimaryKey, data.isRequired), [getPkData, data.isPrimaryKey, data.isRequired]);
    return (
        <div className="field-node">
            {data &&
                <>
                    <div className="field-node-content">
                        <div className="field-node-pk" title={pkTitle}>{pkValue}</div>
                        <div className="field-node-name" title={data.name}>{data.name}</div>
                    </div>
                    <Handle
                        type="target"
                        position={Position.Left}
                        id={createHandleTargetId(data.name)}
                        isConnectable={true}
                    />
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