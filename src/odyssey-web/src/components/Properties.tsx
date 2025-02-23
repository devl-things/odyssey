import React from 'react';

interface PropertiesProps {
    property: string;
}

const Properties: React.FC<PropertiesProps> = ({ property }) => {
    return (
        <p>This is where some additional info about node or edge can be, like this "{property}"</p>
    );
};

export default Properties;