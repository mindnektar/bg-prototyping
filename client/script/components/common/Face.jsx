import React from 'react';
import PropTypes from 'prop-types';

const Face = ({ children, name, ...props }) => (
    <div
        {...props}
        data-face={name}
    >
        {children}
    </div>
);

Face.defaultProps = {
    children: null,
};

Face.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
};

export default Face;
