import React from 'react';
import PropTypes from 'prop-types';
import Face from 'Face';
import SnapPoint from 'SnapPoint';
import Resource from './Resource';

const PlayerBoard = (props) => (
    <div className="rev9-player-board">
        <Face
            name="wagon"
            className="rev9-player-board__main"
            style={{ backgroundColor: props.color }}
        >
            <div className="rev9-player-board__wagon">
                {Array(8).fill(null).map((_, index) => (
                    <SnapPoint key={index}>
                        <Resource type="wild" />
                    </SnapPoint>
                ))}
            </div>
        </Face>

        {Array(4).fill(null).map((_, index) => (
            <React.Fragment key={index}>
                <Face
                    name="inset"
                    className="rev9-player-board__inset"
                    style={{ backgroundColor: props.color }}
                >
                    <SnapPoint className="rev9-player-board__upper-card" />
                    <SnapPoint className="rev9-player-board__cover" />
                    <SnapPoint className="rev9-player-board__lower-card" />
                </Face>

                <Face
                    name="bridge"
                    className="rev9-player-board__bridge"
                    style={{ backgroundColor: props.color }}
                />
            </React.Fragment>
        ))}
    </div>
);

PlayerBoard.propTypes = {
    color: PropTypes.string.isRequired,
};

export default PlayerBoard;
