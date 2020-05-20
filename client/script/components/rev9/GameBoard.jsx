import React from 'react';
import Face from 'Face';
import BuildingSite from './GameBoard/BuildingSite';
import Tower from './GameBoard/Tower';
import Actions from './GameBoard/Actions';
import Market from './GameBoard/Market';
import ScoreTrack from './GameBoard/ScoreTrack';

const GameBoard = () => (
    <>
        <Face name="building-site">
            <BuildingSite />
        </Face>

        <Face name="center">
            <div className="rev9-game-board__center">
                <ScoreTrack>
                    <Tower />
                    <Actions />
                </ScoreTrack>
            </div>
        </Face>

        <Face name="market">
            <Market />
        </Face>
    </>
);

export default GameBoard;
