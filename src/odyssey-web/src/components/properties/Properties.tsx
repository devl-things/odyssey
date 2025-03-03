import React, { useState } from 'react';
import DiagramEdge from '../../data/odyssey-protocol/DiagramEdge';
import DiagramNode from '../../data/odyssey-protocol/DiagramNode';
import EdgeProperties from './EdgeProperties';
import NodeProperties from './NodeProperties';
import Toolbar from '../toolbar/Toolbar';
import './Properties.scss';
import { logInDev } from '../../util/logging';


interface PropertiesProps {
    node?: DiagramNode;
    edge?: DiagramEdge;
    onClose?: () => void;
}

const Properties: React.FC<PropertiesProps> = ({ node, edge, onClose }) => {
    const [triggerSave, setTriggerSave] = useState(false);
    const handleOnSaveNode = (node: DiagramNode): void => {
        //TODO #24
        logInDev(node);
    };
    const handleOnSaveEdge = (node: DiagramEdge): void => {
        //TODO #24
        logInDev(node);
    };
    const handleTriggerOnSave = () => {
        setTriggerSave(prevState => !prevState);
    };

    return (
        <div className='properties'>
            <Toolbar isDirectionRight={true} onClose={onClose} onSave={handleTriggerOnSave} />
            {node && (<NodeProperties node={node} triggerSave={triggerSave} onSave={handleOnSaveNode} />)}
            {edge && (<EdgeProperties edge={edge} triggerSave={triggerSave} onSave={handleOnSaveEdge} />)}
        </div>
    );
};

export default Properties;