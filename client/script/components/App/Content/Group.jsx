import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Convertible from 'Convertible';
import Headline from 'atoms/Headline';
import Model from './Group/Model';
import ModelThumbnail from './Group/ModelThumbnail';

const Group = (props) => {
    const [activeModel, setActiveModel] = useState(null);

    const openModelHandler = (index) => () => {
        if (props.type === 'model') {
            setActiveModel(index);
        }
    };

    const closeModel = () => {
        setActiveModel(null);
    };

    return !props.filtered && (
        <div
            className="group"
            data-scroll={props.label}
        >
            <Headline>{props.label}</Headline>

            {activeModel !== null && (
                <Model
                    obj={props.items[activeModel].model || props.model}
                    texture={
                        props.items[activeModel].component
                            ? `/images/rev9/textures/${props.label}/${activeModel}.png`
                            : null
                    }
                    onClose={closeModel}
                />
            )}

            <div className="group__items">
                {props.items.map((item, index) => (
                    <div
                        key={index}
                        className="group__item"
                        onClick={openModelHandler(index)}
                    >
                        {item.component ? (
                            <Convertible group={props.label}>
                                {React.createElement(item.component, item.props)}
                            </Convertible>
                        ) : (
                            <ModelThumbnail obj={item.model} />
                        )}

                        <div className="group__item-index">#{index + 1}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

Group.defaultProps = {
    items: null,
    type: 'model',
    model: null,
};

Group.propTypes = {
    label: PropTypes.string.isRequired,
    items: PropTypes.array,
    filtered: PropTypes.bool.isRequired,
    type: PropTypes.string,
    model: PropTypes.string,
};

export default Group;
