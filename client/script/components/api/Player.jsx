import React from 'react';
import PropTypes from 'prop-types';

const Player = (props) => (
    <div
        className="player"
        data-player={props.color}
    >
        {props.color}
    </div>
);

Player.propTypes = {
    color: PropTypes.oneOf(['Yellow', 'Purple', 'Blue', 'Orange']).isRequired,
};

export default Player;
