import React from 'react';
import PropTypes from 'prop-types';
import Headline from 'atoms/Headline';

const Group = (props) => (
    <div className="group" data-scroll={props.label}>
        <Headline>{props.label}</Headline>

        <div className="group__items">
            {props.items.map((item, index) => (
                <div key={index} className="group__item">
                    <div
                        className="convertible"
                        data-group={props.label}
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
};

export default Group;
