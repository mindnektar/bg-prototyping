import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Gold = (props) => (
    <div
        className={classNames(
            'rev9-gold',
            { 'rev9-gold--small': props.small }
        )}
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
    small: false,
};

Gold.propTypes = {
    value: PropTypes.number.isRequired,
    style: PropTypes.object,
    small: PropTypes.bool,
};

export default Gold;
