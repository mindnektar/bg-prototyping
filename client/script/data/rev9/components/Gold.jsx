import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Gold = (props) => (
    <div
        className={classNames(
            'rev9-gold',
            `rev9-gold--${props.type}`,
            { 'rev9-gold--small': props.small }
        )}
        style={props.style}
    >
        <img
            className="rev9-gold__icon"
            alt=""
            src={`/images/rev9/icons/${props.type}.svg`}
        />

        <div className="rev9-gold__value">{`$${props.value}`}</div>
    </div>
);

Gold.defaultProps = {
    style: null,
    small: false,
    type: 'gold',
};

Gold.propTypes = {
    value: PropTypes.number.isRequired,
    style: PropTypes.object,
    small: PropTypes.bool,
    type: PropTypes.string,
};

export default Gold;
