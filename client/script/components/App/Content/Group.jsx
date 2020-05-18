import React from 'react';
import PropTypes from 'prop-types';
import Convertible from 'Convertible';
import Headline from 'atoms/Headline';

const Group = (props) => !props.filtered && (
    <div
        className="group"
        data-scroll={props.label}
    >
        <Headline>{props.label}</Headline>

        <div className="group__items">
            {props.items ? (
                props.items.map((item, index) => (
                    <div key={index} className="group__item">
                        <Convertible group={props.label}>
                            {React.createElement(props.component, item)}
                        </Convertible>
                    </div>
                ))
            ) : (
                <div className="group__item">
                    <Convertible group={props.label}>
                        {React.createElement(props.component)}
                    </Convertible>
                </div>
            )}
        </div>
    </div>
);

Group.defaultProps = {
    items: null,
};

Group.propTypes = {
    label: PropTypes.string.isRequired,
    items: PropTypes.array,
    component: PropTypes.func.isRequired,
    filtered: PropTypes.bool.isRequired,
};

export default Group;
