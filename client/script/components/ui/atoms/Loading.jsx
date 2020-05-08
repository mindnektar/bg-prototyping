import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Loading = (props) => (
    <div
        className={classNames(
            'ui-loading',
            { 'ui-loading--disabled': props.disabled }
        )}
    >
        <div className="ui-loading__inner">
            <div>
                <div /><div /><div /><div /><div /><div />
            </div>
        </div>
    </div>
);

Loading.defaultProps = {
    disabled: false,
};

Loading.propTypes = {
    disabled: PropTypes.bool,
};

export default Loading;
