import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Convertible from 'Convertible';
import Headline from 'atoms/Headline';
import Model from './Group/Model';
import ModelThumbnail from './Group/ModelThumbnail';

const Group = (props) => {
    const [activeModel, setActiveModel] = useState(null);

    const openModelHandler = (index) => () => {
        if (props.model || props.models) {
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
            {props.component ? (
                <Convertible group={props.label}>
                    {React.createElement(props.component, item)}
                </Convertible>
            ) : (
                <ModelThumbnail obj={item} />
            )}

            <div className="group__item-index">#{index + 1}</div>
        </div>
    );

    const renderItems = () => {
        if (props.models) {
            return props.models.map(renderItem);
        }

        return props.items ? (
            props.items.map(renderItem)
        ) : (
            renderItem(null, 0)
        );
    };

    return !props.filtered && (
        <div
            className="group"
            data-scroll={props.label}
        >
            <Headline>{props.label}</Headline>

            {activeModel !== null && (
                <Model
                    obj={props.models ? props.models[activeModel] : props.model.obj}
                    texture={
                        props.component
                            ? `/images/rev9/textures/${props.label}/${activeModel}.png`
                            : null
                    }
                    onClose={closeModel}
                />
            )}

            <div className="group__items">
                {renderItems()}
            </div>
        </div>
    );
};

Group.defaultProps = {
    items: null,
    model: null,
    models: null,
    component: null,
};

Group.propTypes = {
    label: PropTypes.string.isRequired,
    items: PropTypes.array,
    component: PropTypes.func,
    filtered: PropTypes.bool.isRequired,
    model: PropTypes.object,
    models: PropTypes.array,
};

export default Group;
