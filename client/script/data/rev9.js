/* eslint-disable import/no-unresolved */
import * as components from './rev9/components';
import * as items from './rev9/items';
import * as models from './rev9/models';
/* eslint-enable import/no-unresolved */
import constants from './rev9/constants';
import Table from './rev9/Table';

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
    table: Table,
    constants,
};
