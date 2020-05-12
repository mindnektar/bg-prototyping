import React from 'react';
import PropTypes from 'prop-types';

const Gold = (props) => (
    <div
        className="rev9-gold"
        style={{
            ...props.style,
            color: props.value === 1 ? '#666666' : '#9e7e20',
        }}
    >
        <img
            className="rev9-gold__icon"
            alt=""
            src={`/images/rev9/icons/gold${props.value === 1 ? '-silver' : ''}.svg`}
        />

        <div className="rev9-gold__value">{`$${props.value}`}</div>
    </div>
);

Gold.defaultProps = {
    style: null,
};

Gold.propTypes = {
    value: PropTypes.number.isRequired,
    style: PropTypes.object,
};

export default Gold;
