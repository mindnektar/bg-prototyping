import React from 'react';
import PropTypes from 'prop-types';

const SnapPoint = ({ children, ...props }) => (
    <div
        {...props}
        data-snap-point
    >
        {children}
    </div>
);

SnapPoint.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SnapPoint;
