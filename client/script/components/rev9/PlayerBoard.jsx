import React from 'react';
import PropTypes from 'prop-types';
import Face from 'Face';
import Resource from './Resource';

const PlayerBoard = (props) => (
    <>
        <Face>
            <div
                className="rev9-player-board"
                style={{ backgroundColor: props.color }}
            >
                <div className="rev9-player-board__wagon">
                    {Array(8).fill(null).map((_, index) => (
                        <div key={index}>
                            <Resource type="wild" />
                        </div>
                    ))}
                </div>
            </div>
        </Face>

        <Face>
            <div
                className="rev9-player-board__inset"
                style={{ backgroundColor: props.color }}
            />
        </Face>

        <Face>
            <div
                className="rev9-player-board__bridge"
                style={{ backgroundColor: props.color }}
            />
        </Face>
    </>
);

PlayerBoard.propTypes = {
    color: PropTypes.string.isRequired,
};

export default PlayerBoard;
