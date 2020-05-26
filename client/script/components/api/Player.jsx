import React from 'react';
import PropTypes from 'prop-types';

const Player = (props) => (
    <div
        className="player"
        data-player={JSON.stringify(props)}
    >
        <div
            className="player__text"
            style={{
                color: props.color,
                transform: `rotate(${props.rotation}deg)`,
            }}
        >
            {props.color}
        </div>
    </div>
);

Player.defaultProps = {
    rotation: 0,
};

Player.propTypes = {
    color: PropTypes.oneOf(['Yellow', 'Purple', 'Blue', 'Orange']).isRequired,
    rotation: PropTypes.number,
};

export default Player;
