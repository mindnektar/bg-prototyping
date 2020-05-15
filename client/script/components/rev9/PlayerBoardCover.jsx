import React from 'react';
import PropTypes from 'prop-types';
import Resource from './Resource';

const PlayerBoard = (props) => (
    <div
        className="rev9-player-board-cover"
        style={{ backgroundColor: props.color }}
    >
        <div className="rev9-player-board-cover__building">
            <div />
        </div>

        <div className="rev9-player-board-cover__warehouse">
            {Array(4).fill(null).map((_, index) => (
                <div key={index}>
                    <Resource type="wild" />
                </div>
            ))}
        </div>
    </div>
);

PlayerBoard.propTypes = {
    color: PropTypes.string.isRequired,
};

export default PlayerBoard;
