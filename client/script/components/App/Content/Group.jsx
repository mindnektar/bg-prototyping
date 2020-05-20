import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Convertible from 'Convertible';
import Headline from 'atoms/Headline';
import Model from './Group/Model';

const Group = (props) => {
    const [activeModel, setActiveModel] = useState(null);

    const openModelHandler = (index) => () => {
        if (props.model) {
            setActiveModel(index);
        }
    };

    const closeModel = () => {
        setActiveModel(null);
    };

    const renderItem = (item, index) => (
        <div
            key={index}
            className="group__item"
            onClick={openModelHandler(index)}
        >
            <Convertible group={props.label}>
                {React.createElement(props.component, item)}
            </Convertible>

            <div className="group__item-index">#{index + 1}</div>
        </div>
    );

    return !props.filtered && (
        <div
            className="group"
            data-scroll={props.label}
        >
            <Headline>{props.label}</Headline>

            {activeModel !== null && (
                <Model
                    obj={props.model.obj}
                    texture={`/images/rev9/textures/${props.label}/${activeModel}.png`}
                    onClose={closeModel}
                />
            )}

            <div className="group__items">
                {props.items ? (
                    props.items.map(renderItem)
                ) : (
                    renderItem(null, 0)
                )}
            </div>
        </div>
    );
};

Group.defaultProps = {
    items: null,
    model: null,
};

Group.propTypes = {
    label: PropTypes.string.isRequired,
    items: PropTypes.array,
    component: PropTypes.func.isRequired,
    filtered: PropTypes.bool.isRequired,
    model: PropTypes.object,
};

export default Group;
