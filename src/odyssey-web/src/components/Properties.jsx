import React from 'react';
import PropTypes from 'prop-types';

const Properties = ({ property }) => {
    return (<>
        <p>This is where some additional info about node or edge can be, like this "{property}"</p>
    </>);
};

Properties.propTypes = {
    property: PropTypes.string.isRequired,
};

export default Properties;