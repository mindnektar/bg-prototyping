import React from 'react';
import PropTypes from 'prop-types';

const Convertible = (props) => (
    <div
        className="convertible"
        data-group={props.group}
    >
        {props.children}
    </div>
);

Convertible.propTypes = {
    children: PropTypes.node.isRequired,
    group: PropTypes.string.isRequired,
};

export default Convertible;
