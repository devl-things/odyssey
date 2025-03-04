import React, { useCallback, useState } from 'react';
import DiagramEdge from '../../data/odyssey-protocol/DiagramEdge';
import DiagramNode from '../../data/odyssey-protocol/DiagramNode';
import EdgeProperties from './EdgeProperties';
import NodeProperties from './NodeProperties';
import Toolbar from '../toolbar/Toolbar';
import './Properties.scss';


interface PropertiesProps {
    node?: DiagramNode;
    onNodeChange?: (node: DiagramNode) => void;
    edge?: DiagramEdge;
    onEdgeChange?: (edge: DiagramEdge) => void;
    onClose?: () => void;
}

const Properties: React.FC<PropertiesProps> = ({ node, edge, onNodeChange, onEdgeChange, onClose }) => {
    const [triggerSave, setTriggerSave] = useState(false);
    const handleOnSaveNode = useCallback((node: DiagramNode): void => {
        if (onNodeChange) {
            onNodeChange(node);
        }
    }, []);
    const handleOnSaveEdge = useCallback((edge: DiagramEdge): void => {
        if (onEdgeChange) {
            onEdgeChange(edge);
        }
    }, []);
    const handleTriggerOnSave = useCallback(() => {
        setTriggerSave(prevState => !prevState);
    }, []);

    return (
        <div className='properties'>
            <Toolbar isDirectionRight={true} onClose={onClose} onSave={handleTriggerOnSave} />
            {node && (<NodeProperties node={node} triggerSave={triggerSave} onSave={handleOnSaveNode} />)}
            {edge && (<EdgeProperties edge={edge} triggerSave={triggerSave} onSave={handleOnSaveEdge} />)}
        </div>
    );
};

export default Properties;