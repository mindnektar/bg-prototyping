import React from 'react';
import PropTypes from 'prop-types';

const Close = (props) => (
    <div
        className="ui-close"
        onClick={props.onClick}
    >
        ×
    </div>
);

Close.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default Close;
