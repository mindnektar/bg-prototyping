import React from 'react';
import Face from 'Face';
import BuildingSite from './GameBoard/BuildingSite';
import Tower from './GameBoard/Tower';
import Actions from './GameBoard/Actions';
import Market from './GameBoard/Market';
import ScoreTrack from './GameBoard/ScoreTrack';

const GameBoard = () => (
    <div className="rev9-game-board">
        <BuildingSite />

        <Face name="center" className="rev9-game-board__center">
            <ScoreTrack>
                <Tower />
                <Actions />
            </ScoreTrack>
        </Face>

        <Market />
    </div>
);

export default GameBoard;
