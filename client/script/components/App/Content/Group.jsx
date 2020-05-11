import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Headline from 'atoms/Headline';

const Group = (props) => (
    <div
        className={classNames(
            'group',
            { 'group--filtered': props.filtered }
        )}
        data-scroll={props.label}
    >
        <Headline>{props.label}</Headline>

        <div className="group__items">
            {props.items.map((item, index) => (
                <div key={index} className="group__item">
                    <div
                        className="convertible"
                        data-group={props.label}
                        data-filtered={props.filtered}
                    >
                        {React.createElement(props.component, item)}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

Group.propTypes = {
    label: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    component: PropTypes.func.isRequired,
    filtered: PropTypes.bool.isRequired,
};

export default Group;
