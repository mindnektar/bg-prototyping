import React from 'react';
import PropTypes from 'prop-types';

const scale = { fabric: 2, wood: 2.5, wheat: 2, stone: 3 };
const colors = { fabric: '#a9d283', wood: '#5a8236', wheat: '#e8df6f', stone: '#898b90' };

const Resource = (props) => (
    <div
        className={`rev9-resource rev9-resource--level-${props.level}`}
        style={{
            ...props.style,
            backgroundColor: colors[props.type],
        }}
    >
        <div className="rev9-resource__level">
            {Array(props.level).fill(null).map((_, index) => (
                <img
                    key={index}
                    className="rev9-resource__level-item"
                    alt=""
                    src="/images/rev9/icons/star.svg"
                />
            ))}
        </div>

        <img
            className="rev9-resource__image"
            alt=""
            src={`/images/rev9/icons/${props.type}.svg`}
            style={{
                transform: `scale(${scale[props.type]})`,
            }}
        />
    </div>
);

Resource.defaultProps = {
    style: null,
};

Resource.propTypes = {
    type: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    style: PropTypes.object,
};

export default Resource;
