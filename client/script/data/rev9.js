/* eslint-disable import/no-unresolved */
import * as components from './rev9/components';
import * as items from './rev9/items';
import * as models from './rev9/models';
/* eslint-enable import/no-unresolved */

const resourceColors = ['#5a8236', '#898b90', '#a9d283', '#e8df6f'];

export default {
    groups: [
        {
            label: 'Game board',
            items: [{ component: components.gameBoard }],
            model: models.gameBoard,
            textureSize: 6144,
            textureMap: [
                ['building-site', 0.521, 0.667, 0.836, 0.333, 90],
                ['center', 0.26, 0.565, 0.521, 0, 180],
                ['market', 0.521, 1, 0.836, 0.667, 90],
            ],
        },
        {
            label: 'Player boards',
            items: items.playerBoards.map((item) => ({
                component: components.playerBoard,
                props: item,
            })),
            model: models.playerBoard,
            textureSize: 4096,
            textureMap: [
                ['wagon', 0.439, 0.439, 0.614, 0],
                ['inset', 0.614, 0.439, 0.79, 0],
                ['bridge', 0.745, 0.877, 0.767, 0.439],
                ['inset', 0.79, 0.877, 0.965, 0.439],
                ['bridge', 0.767, 0.877, 0.79, 0.439],
                ['inset', 0.79, 0.439, 0.965, 0],
                ['bridge', 0.723, 0.877, 0.745, 0.439],
                ['inset', 0.439, 0.877, 0.614, 0.439],
                ['bridge', 0.702, 0.877, 0.723, 0.439],
            ],
        },
        {
            label: 'Player board covers',
            items: items.playerBoardCovers.map((item) => ({
                component: components.playerBoardCover,
                props: item,
            })),
            model: models.playerBoardCover,
            textureSize: 1024,
            textureMap: [
                ['default', 0.481, 0.667, 0.963, 0],
            ],
        },
        {
            label: 'Start tile',
            items: [{ component: components.startTile }],
            model: models.startTile,
            textureSize: 1024,
            textureMap: [
                ['default', 0, 1, 0.5, 0.5],
            ],
        },
        {
            label: 'Tiles',
            items: items.tiles.map((item) => ({
                component: components.tile,
                props: item,
            })),
            model: models.tile,
            textureSize: 1024,
            textureMap: [
                ['default', 0, 1, 0.5, 0.5],
            ],
        },
        {
            label: 'Resources',
            items: items.resources.map((item) => ({
                component: components.resource,
                props: item,
            })),
            model: models.resource,
            textureSize: 1024,
            textureMap: [
                ['default', 0, 1, 0.5, 0.5, (360 / 32) * 30.5],
                ['default', 0, 0.5, 0.5, 0, (360 / 32) * 22.5],
            ],
        },
        {
            label: 'Gold',
            items: items.gold.map((item) => ({
                component: components.gold,
                props: item,
            })),
            model: models.gold,
            textureSize: 1024,
            textureMap: [
                ['default', 0, 1, 0.5, 0.5, (360 / 32) * 26.5],
                ['default', 0, 0.5, 0.5, 0, (360 / 32) * 17.5],
            ],
        },
        {
            label: 'Building cards',
            type: 'card',
            items: items.buildingCards.map((item) => ({
                component: components.buildingCard,
                props: item,
            })),
        },
        {
            label: 'Pieces',
            items: [{
                model: models.dwelling,
            }, {
                model: models.houseA,
            }, {
                model: models.houseB,
            }, {
                model: models.houseC,
            }, {
                model: models.houseD,
            }, {
                model: models.wagon,
            }],
        },
    ],
    tts: {
        objects: [
            {
                group: 'Game board',
                position: { x: 0, z: 20 },
                rotation: { y: 180 },
                locked: true,
                preciseCollision: true,
            },
            {
                type: 'Bag',
                position: { x: 0, z: -4 },
                rotation: { y: 180 },
                contents: {
                    group: 'Tiles',
                    indexes: items.tiles.map((_, index) => index),
                    gridSnapping: true,
                },
            },
            ...items.resources.map((_, index) => ({
                type: 'Infinite_Bag',
                position: {
                    x: (Math.floor(index / 3) * 4) - 8,
                    z: (index % 3) * 4,
                },
                rotation: { y: 180 },
                color: resourceColors[Math.floor(index / 3)],
                contents: {
                    group: 'Resources',
                    indexes: [index],
                },
            })),
            ...items.gold.map((_, index) => ({
                type: 'Infinite_Bag',
                position: {
                    x: 8,
                    z: ((index % 3) * 4) + 2,
                },
                rotation: { y: 180 },
                contents: {
                    group: 'Gold',
                    indexes: [index],
                },
            })),
            {
                type: 'Deck',
                position: { x: 0, z: -12 },
                rotation: { y: 180 },
                scale: 2,
                contents: {
                    group: 'Building cards',
                    indexes: Object.keys(items.buildingCards),
                },
            },
            {
                group: 'Start tile',
                position: { x: -4, z: -4 },
                gridSnapping: true,
            },
            ...items.playerBoards.map((_, index) => ({
                group: 'Player boards',
                textureIndex: index,
                modelIndex: 0,
                position: { x: (index * 24) - 36, z: -22 },
                rotation: { y: 180 },
                locked: true,
                preciseCollision: true,
            })),
            ...items.playerBoardCovers.map((_, index) => ({
                group: 'Player board covers',
                textureIndex: index,
                modelIndex: 0,
                position: { x: (index * 24) - 41, y: 1.5, z: -22 },
                rotation: { y: 180 },
            })),
            ...items.playerBoardCovers.map((_, index) => ({
                group: 'Player board covers',
                textureIndex: index,
                modelIndex: 0,
                position: { x: (index * 24) - 36.5, y: 1.5, z: -22 },
                rotation: { y: 180 },
            })),
            ...items.playerBoardCovers.map((_, index) => ({
                group: 'Player board covers',
                textureIndex: index,
                modelIndex: 0,
                position: { x: (index * 24) - 32, y: 1.5, z: -22 },
                rotation: { y: 180 },
            })),
            ...items.playerBoardCovers.map((_, index) => ({
                group: 'Player board covers',
                textureIndex: index,
                modelIndex: 0,
                position: { x: (index * 24) - 27.5, y: 1.5, z: -22 },
                rotation: { y: 180 },
            })),
        ],
    },
};
