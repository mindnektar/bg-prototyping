import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => (
    <div
        className="ui-button"
        onClick={props.onClick}
    >
        {props.children}
    </div>
);

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Button;
