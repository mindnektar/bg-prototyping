import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import DataContext from 'contexts/data';
import Face from 'Face';
import SnapPoint from 'SnapPoint';
import TableObject from 'TableObject';
import Resource from './Resource';

const PlayerBoard = (props) => {
    const { groups } = useContext(DataContext);
    const playerBoardCovers = groups.find(({ label }) => label === 'Player board covers');

    return (
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
                        <SnapPoint className="rev9-player-board__cover-position" />
                        <SnapPoint className="rev9-player-board__lower-card" />

                        <div className="rev9-player-board__cover">
                            <TableObject
                                group="Player board covers"
                                zPosition={0.25}
                                textureIndex={
                                    playerBoardCovers.items.findIndex((item) => (
                                        item.props.color === props.color
                                    )) + index
                                }
                            />
                        </div>
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
};

PlayerBoard.propTypes = {
    color: PropTypes.string.isRequired,
};

export default PlayerBoard;
