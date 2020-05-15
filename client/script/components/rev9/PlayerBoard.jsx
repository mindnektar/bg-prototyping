import React from 'react';
import PropTypes from 'prop-types';

const PlayerBoard = (props) => (
    <div
        className="rev9-player-board"
        style={{ backgroundColor: props.color }}
    >
        <div className="rev9-player-board__wagon">
            {Array(8).fill(null).map((_, index) => (
                <div key={index} />
            ))}
        </div>
    </div>
);

PlayerBoard.propTypes = {
    color: PropTypes.string.isRequired,
};

export default PlayerBoard;
