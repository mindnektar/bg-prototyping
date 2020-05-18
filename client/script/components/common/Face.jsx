import React from 'react';
import PropTypes from 'prop-types';

const Face = (props) => (
    <div className="face">
        {props.children}
    </div>
);

Face.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Face;
