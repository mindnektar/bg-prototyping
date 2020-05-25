import React from 'react';
import PropTypes from 'prop-types';
import SnapPoint from 'SnapPoint';
import TableObject from 'TableObject';
import Resource from './Resource';

const PlayerBoardCover = (props) => (
    <div
        className="rev9-player-board-cover"
        style={{ backgroundColor: props.color }}
    >
        <SnapPoint className="rev9-player-board-cover__building">
            <div className="rev9-player-board-cover__building-inner">
                <TableObject
                    group="Pieces"
                    modelIndex={props.building}
                    color={props.color}
                    zPosition={2}
                />
            </div>
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

PlayerBoardCover.propTypes = {
    color: PropTypes.string.isRequired,
    building: PropTypes.number.isRequired,
};

export default PlayerBoardCover;
