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

SnapPoint.defaultProps = {
    children: null,
};

SnapPoint.propTypes = {
    children: PropTypes.node,
};

export default SnapPoint;
