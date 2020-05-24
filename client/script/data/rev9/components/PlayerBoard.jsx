import React from 'react';
import PropTypes from 'prop-types';
import Face from 'Face';
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
                    <div key={index}>
                        <Resource type="wild" />
                    </div>
                ))}
            </div>
        </Face>

        <Face
            name="inset"
            className="rev9-player-board__inset"
            style={{ backgroundColor: props.color }}
        />

        <Face
            name="bridge"
            className="rev9-player-board__bridge"
            style={{ backgroundColor: props.color }}
        />

        <Face
            name="inset"
            className="rev9-player-board__inset"
            style={{ backgroundColor: props.color }}
        />

        <Face
            name="bridge"
            className="rev9-player-board__bridge"
            style={{ backgroundColor: props.color }}
        />

        <Face
            name="inset"
            className="rev9-player-board__inset"
            style={{ backgroundColor: props.color }}
        />

        <Face
            name="bridge"
            className="rev9-player-board__bridge"
            style={{ backgroundColor: props.color }}
        />

        <Face
            name="inset"
            className="rev9-player-board__inset"
            style={{ backgroundColor: props.color }}
        />

        <Face
            name="bridge"
            className="rev9-player-board__bridge"
            style={{ backgroundColor: props.color }}
        />
    </div>
);

PlayerBoard.propTypes = {
    color: PropTypes.string.isRequired,
};

export default PlayerBoard;
