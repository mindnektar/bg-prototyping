import React from 'react';
import PropTypes from 'prop-types';

const Icon = (props) => (
    <img
        className={`ui-icon ui-icon--${props.type}`}
        alt=""
        src={`/images${props.context && `/${props.context}`}/icons/${props.type}.svg`}
    />
);

Icon.defaultProps = {
    context: '',
};

Icon.propTypes = {
    type: PropTypes.string.isRequired,
    context: PropTypes.string,
};

export default Icon;
