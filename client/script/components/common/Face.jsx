import React from 'react';
import PropTypes from 'prop-types';

const Face = (props) => (
    <div className="face" data-name={props.name}>
        {props.children}
    </div>
);

Face.propTypes = {
    children: PropTypes.node.isRequired,
    name: PropTypes.string.isRequired,
};

export default Face;
