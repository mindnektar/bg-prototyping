/* eslint-disable import/no-unresolved */
import * as components from './rev9/components';
import * as items from './rev9/items';
import * as models from './rev9/models';
/* eslint-enable import/no-unresolved */
import constants from './rev9/constants';
import Table from './rev9/Table';

const resourceColors = ['#5a8236', '#898b90', '#a9d283', '#e8df6f'];
const playerColors = ['#f3f197', '#cc9dcc', '#9a9aff', '#f1bd60'];

export default {
    groups: [
        {
            label: 'Game board',
            items: [{ component: components.gameBoard }],
            model: models.gameBoard,
            textureSize: 6144,
            textureMap: [
                ['building-site', 0.517, 0.667, 0.831, 0.333, 90],
                ['center', 0, 0.565, 0.259, 0],
                ['market', 0, 0.898, 0.314, 0.565, 90],
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
            label: 'Copper',
            items: [{
                component: components.gold,
                props: { value: 1, type: 'copper' },
            }],
            model: models.copper,
            textureSize: 1024,
            textureMap: [
                ['default', 0, 1, 0.5, 0.5, (360 / 32) * 26.5],
                ['default', 0, 0.5, 0.5, 0, (360 / 32) * 17.5],
            ],
        },
        {
            label: 'Silver',
            items: [{
                component: components.gold,
                props: { value: 5, type: 'silver' },
            }],
            model: models.silver,
            textureSize: 1024,
            textureMap: [
                ['default', 0, 1, 0.5, 0.5, (360 / 32) * 26.5],
                ['default', 0, 0.5, 0.5, 0, (360 / 32) * 17.5],
            ],
        },
        {
            label: 'Gold',
            items: [{
                component: components.gold,
                props: { value: 10 },
            }],
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
            }, {
                model: models.scoreMarker,
            }, {
                model: models.constructionSiteMarker,
            }, {
                model: models.constructionProgressMarker,
            }, {
                model: models.constructionCompletionMarker,
                collider: models.constructionCompletionMarkerCollider,
            }, {
                model: models.diamond,
            }],
        },
    ],
    tts: {
        objects: [
            // {
            //     type: 'custom',
            //     group: 'Game board',
            //     textureIndex: 0,
            //     modelIndex: 0,
            //     selfCollider: true,
            //     position: { x: 0, y: 0.05, z: 25 },
            //     rotation: { y: 180 },
            //     locked: true,
            // },
            // ...Array(4).fill(null).map((_, index) => ({
            //     type: 'custom',
            //     group: 'Pieces',
            //     modelIndex: 6,
            //     color: playerColors[index],
            //     position: {
            //         x: -5.4,
            //         y: 0.2 + (index * 0.2),
            //         z: 37.6,
            //     },
            //     rotation: { y: 180 },
            // })),
            // {
            //     type: 'custom',
            //     group: 'Pieces',
            //     modelIndex: 8,
            //     color: '#8e6d3f',
            //     position: { x: -21.12, y: 0.45, z: 19.34 },
            // },
            // {
            //     type: 'custom',
            //     group: 'Pieces',
            //     modelIndex: 9,
            //     customCollider: true,
            //     color: '#8e6d3f',
            //     position: { x: -13.92, y: 0.15, z: 19.34 },
            // },
            // {
            //     type: 'bag',
            //     position: { x: 0, z: -4 },
            //     rotation: { y: 180 },
            //     locked: true,
            //     contents: items.tiles.map((_, index) => ({
            //         type: 'custom',
            //         group: 'Tiles',
            //         textureIndex: index,
            //         modelIndex: 0,
            //         gridSnapping: true,
            //     })),
            // },
            ...items.resources.map((_, index) => ({
                type: 'bag',
                position: {
                    x: (Math.floor(index / 3) * 4) - 8,
                    z: (index % 3) * 4,
                },
                rotation: { y: 180 },
                color: resourceColors[Math.floor(index / 3)],
                locked: true,
                infinite: true,
                contents: [{
                    type: 'custom',
                    group: 'Resources',
                    textureIndex: index,
                    modelIndex: 0,
                }],
            })),
            ...items.gold.map((_, index) => ({
                type: 'bag',
                position: {
                    x: 8,
                    z: index * 4,
                },
                rotation: { y: 180 },
                locked: true,
                infinite: true,
                contents: [{
                    type: 'custom',
                    group: ['Copper', 'Silver', 'Gold'][index],
                    textureIndex: 0,
                    modelIndex: 0,
                }],
            })),
            // {
            //     type: 'bag',
            //     position: {
            //         x: 12,
            //         z: 2,
            //     },
            //     rotation: { y: 180 },
            //     locked: true,
            //     infinite: true,
            //     contents: [{
            //         type: 'custom',
            //         group: 'Pieces',
            //         modelIndex: 0,
            //         color: '#ffffff',
            //     }],
            // },
            // {
            //     type: 'bag',
            //     position: {
            //         x: 12,
            //         z: 6,
            //     },
            //     rotation: { y: 180 },
            //     locked: true,
            //     infinite: true,
            //     contents: [{
            //         type: 'custom',
            //         group: 'Pieces',
            //         modelIndex: 10,
            //         color: '#cccccc',
            //         glass: true,
            //     }],
            // },
            {
                type: 'deck',
                group: 'Building cards',
                position: { x: 0, z: -12 },
                rotation: { y: 180 },
                scale: 2,
            },
            // {
            //     type: 'custom',
            //     group: 'Start tile',
            //     textureIndex: 0,
            //     modelIndex: 0,
            //     position: { x: -4, z: -4 },
            //     gridSnapping: true,
            // },
            // ...items.playerBoards.map((_, index) => ({
            //     type: 'custom',
            //     group: 'Player boards',
            //     textureIndex: index,
            //     modelIndex: 0,
            //     selfCollider: true,
            //     position: { x: (index * 24) - 36, y: 0.2, z: -27 },
            //     rotation: { y: 180 },
            //     locked: true,
            // })),
            ...items.playerBoardCovers.map((_, index) => ({
                type: 'custom',
                group: 'Player board covers',
                textureIndex: index,
                modelIndex: 0,
                position: { x: (index * 24) - 41, y: 0.25, z: -27 },
                rotation: { y: 180 },
            })),
            ...items.playerBoardCovers.map((_, index) => ({
                type: 'custom',
                group: 'Player board covers',
                textureIndex: index,
                modelIndex: 0,
                position: { x: (index * 24) - 36.5, y: 0.25, z: -27 },
                rotation: { y: 180 },
            })),
            ...items.playerBoardCovers.map((_, index) => ({
                type: 'custom',
                group: 'Player board covers',
                textureIndex: index,
                modelIndex: 0,
                position: { x: (index * 24) - 32, y: 0.25, z: -27 },
                rotation: { y: 180 },
            })),
            ...items.playerBoardCovers.map((_, index) => ({
                type: 'custom',
                group: 'Player board covers',
                textureIndex: index,
                modelIndex: 0,
                position: { x: (index * 24) - 27.5, y: 0.25, z: -27 },
                rotation: { y: 180 },
            })),
            ...Array(4).fill(null).reduce((result, current, playerIndex) => [
                ...result,
                ...Array(4).fill(null).map((_, buildingIndex) => ({
                    type: 'custom',
                    group: 'Pieces',
                    modelIndex: buildingIndex + 1,
                    color: playerColors[playerIndex],
                    position: {
                        x: ((playerIndex * 24) - 42) + (4.5 * buildingIndex),
                        y: 2,
                        z: -27,
                    },
                    rotation: { y: 180 },
                })),
            ], []),
            ...Array(4).fill(null).map((_, index) => ({
                type: 'custom',
                group: 'Pieces',
                modelIndex: 5,
                color: playerColors[index],
                position: {
                    x: (index * 24) - 37,
                    y: 2,
                    z: -34,
                },
                rotation: { y: 180 },
            })),
            ...Array(4).fill(null).map((_, index) => ({
                type: 'custom',
                group: 'Pieces',
                modelIndex: 7,
                color: playerColors[index],
                position: {
                    x: (index * 24) - 35,
                    y: 2,
                    z: -34,
                },
                rotation: { y: 180 },
            })),
        ],
    },
    table: Table,
    constants,
};
