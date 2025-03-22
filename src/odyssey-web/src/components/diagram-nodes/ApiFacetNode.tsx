import React from 'react';
import { OdysseyNodeProps } from '../../data/odyssey-protocol/OdysseyData';
import { toUpperCaseSafe } from '../../util/StringManipulations';
import './DiagramNodes.scss';

const ApiFacetNode: React.FC<OdysseyNodeProps> = ({ data }) => {
    return (
        <div className="api-facet-node">
            {toUpperCaseSafe(data.direction)}
        </div>
    );
};

export default ApiFacetNode;