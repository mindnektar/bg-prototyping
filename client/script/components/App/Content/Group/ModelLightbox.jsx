import React from 'react';
import PropTypes from 'prop-types';
import Model from 'Model';
import Close from 'atoms/Close';

const ModelLightbox = (props) => (
    <div className="model-lightbox">
        <div className="model-lightbox__overlay" />

        <Model
            objectData={props.obj}
            texture={props.texture}
            withControls
        />

        <Close onClick={props.onClose} />
    </div>
);

ModelLightbox.defaultProps = {
    texture: null,
};

ModelLightbox.propTypes = {
    obj: PropTypes.string.isRequired,
    texture: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};

export default ModelLightbox;
