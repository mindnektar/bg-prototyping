import BuildingCard from 'components/rev9/BuildingCard';
import Resource from 'components/rev9/Resource';
import Tile from 'components/rev9/Tile';
import Gold from 'components/rev9/Gold';
import StartTile from 'components/rev9/StartTile';
import PlayerBoard from 'components/rev9/PlayerBoard';
import PlayerBoardCover from 'components/rev9/PlayerBoardCover';
import buildingCards from './rev9/items/building-cards';
import resources from './rev9/items/resources';
import tiles from './rev9/items/tiles';
import gold from './rev9/items/gold';
import playerBoards from './rev9/items/player-boards';
import playerBoardCovers from './rev9/items/player-board-covers';
import goldModel from './rev9/models/gold.obj';
import startTileModel from './rev9/models/start-tile.obj';
import playerBoardModel from './rev9/models/player-board.obj';
import playerBoardCoverModel from './rev9/models/player-board-cover.obj';
import tileModel from './rev9/models/tile.obj';
import resourceModel from './rev9/models/resource.obj';

const resourceColors = ['#5a8236', '#898b90', '#a9d283', '#e8df6f'];

export default {
    groups: [
        {
            label: 'Player boards',
            items: playerBoards,
            component: PlayerBoard,
            model: {
                obj: playerBoardModel,
                textureSize: 4096,
                textureMap: [
                    [0.439, 0.439, 0.614, 0],
                ],
            },
        },
        {
            label: 'Player board covers',
            items: playerBoardCovers,
            component: PlayerBoardCover,
            model: {
                obj: playerBoardCoverModel,
                textureSize: 1024,
                textureMap: [
                    [0.481, 0.667, 0.963, 0],
                ],
            },
        },
        {
            label: 'Start tile',
            component: StartTile,
            model: {
                obj: startTileModel,
                textureSize: 1024,
                textureMap: [
                    [0, 1, 0.5, 0.5],
                ],
            },
        },
        {
            label: 'Tiles',
            items: tiles,
            component: Tile,
            model: {
                obj: tileModel,
                textureSize: 1024,
                textureMap: [
                    [0, 1, 0.5, 0.5],
                ],
            },
        },
        {
            label: 'Resources',
            items: resources,
            component: Resource,
            model: {
                obj: resourceModel,
                textureSize: 1024,
                textureMap: [
                    [0, 1, 0.5, 0.5, (360 / 32) * 30.5],
                    [0, 0.5, 0.5, 0, (360 / 32) * 22.5],
                ],
            },
        },
        {
            label: 'Gold',
            items: gold,
            component: Gold,
            model: {
                obj: goldModel,
                textureSize: 1024,
                textureMap: [
                    [0, 1, 0.5, 0.5, (360 / 32) * 26.5],
                    [0, 0.5, 0.5, 0, (360 / 32) * 17.5],
                ],
            },
        },
        {
            label: 'Building cards',
            items: buildingCards,
            component: BuildingCard,
        },
    ],
    tts: {
        objects: [
            {
                type: 'Bag',
                position: { x: 0, y: -4 },
                contents: {
                    group: 'Tiles',
                    indexes: tiles.map((_, index) => index),
                    gridSnapping: true,
                },
            },
            ...resources.map((_, index) => ({
                type: 'Infinite_Bag',
                position: {
                    x: (Math.floor(index / 3) * 4) - 8,
                    y: (index % 3) * 4,
                },
                color: resourceColors[Math.floor(index / 3)],
                contents: {
                    group: 'Resources',
                    indexes: [index],
                },
            })),
            ...gold.map((_, index) => ({
                type: 'Infinite_Bag',
                position: {
                    x: 8,
                    y: ((index % 3) * 4) + 2,
                },
                contents: {
                    group: 'Gold',
                    indexes: [index],
                },
            })),
            {
                type: 'Deck',
                position: { x: 0, y: -12 },
                scale: 2,
                contents: {
                    group: 'Building cards',
                    indexes: buildingCards.map((_, index) => index + 100),
                },
            },
            {
                group: 'Start tile',
                position: { x: -4, y: -4 },
                gridSnapping: true,
            },
        ],
    },
};
