import React from 'react';
import PropTypes from 'prop-types';
import SnapPoint from 'SnapPoint';
import Resource from './Resource';

const PlayerBoard = (props) => (
    <div
        className="rev9-player-board-cover"
        style={{ backgroundColor: props.color }}
    >
        <SnapPoint className="rev9-player-board-cover__building">
            <div />
        </SnapPoint>

        <div className="rev9-player-board-cover__warehouse">
            {Array(4).fill(null).map((_, index) => (
                <SnapPoint key={index}>
                    <Resource type="wild" />
                </SnapPoint>
            ))}
        </div>
    </div>
);

PlayerBoard.propTypes = {
    color: PropTypes.string.isRequired,
};

export default PlayerBoard;
