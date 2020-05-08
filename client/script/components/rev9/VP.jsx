import React from 'react';
import PropTypes from 'prop-types';

const VP = (props) => (
    <div className="rev9-vp">
        <img
            className="rev9-vp__icon"
            alt=""
            src="/images/rev9/icons/vp.svg"
        />

        <div className="rev9-vp__value">{props.value}</div>
    </div>
);

VP.propTypes = {
    value: PropTypes.number.isRequired,
};

export default VP;
