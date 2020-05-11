import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = (props) => (
    <label className="ui-checkbox">
        <input
            className="ui-checkbox__input"
            checked={props.checked}
            onChange={props.onChange}
            type="checkbox"
        />

        <span className="ui-checkbox__box">
            &#10004;
        </span>

        <span className="ui-checkbox__label">
            {props.label}
        </span>
    </label>
);

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Checkbox;
