import React from 'react';
import OdysseyData from '../../data/odyssey-protocol/OdysseyData';
import { toUpperCaseSafe } from '../../util/StringManipulations';
import './DiagramNodes.scss';

interface ApiFacetNodeProps {
    data?: OdysseyData;
}

const ApiFacetNode: React.FC<ApiFacetNodeProps> = ({ data }) => {
    return (
        <div className="api-facet-node">
            {toUpperCaseSafe(data.direction)}
        </div>
    );
};

export default ApiFacetNode;