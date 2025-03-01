import React, { useState } from 'react';
import DiagramNode from '../../data/odyssey-protocol/DiagramNode';
import { logInDev } from '../../util/logging';
import NodeProperties from './NodeProperties';
import Toolbar from '../toolbar/Toolbar';
import './Properties.scss';

interface PropertiesProps {
    node?: DiagramNode;
    onClose?: () => void;
}

const Properties: React.FC<PropertiesProps> = ({ node, onClose }) => {
    const [triggerSave, setTriggerSave] = useState(false);
    const handleOnSave = (node: DiagramNode): void => {
        logInDev(node);
    };
    const handleTriggerOnSave = () => {
        setTriggerSave(prevState => !prevState);
    };

    return (
        <div className='properties'>
            <Toolbar onClose={onClose} onSave={handleTriggerOnSave} />
            {node && (<NodeProperties node={node} triggerSave={triggerSave} onSave={handleOnSave} />)}
        </div>
    );
};

export default Properties;