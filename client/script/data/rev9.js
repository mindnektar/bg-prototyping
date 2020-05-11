import BuildingCard from 'components/rev9/BuildingCard';
import Resource from 'components/rev9/Resource';
import Tile from 'components/rev9/Tile';
import buildingCards from './rev9/building-cards';
import resources from './rev9/resources';
import tiles from './rev9/tiles';
import tileModel from './rev9/models/tile.obj';
import resourceModel from './rev9/models/resource.obj';

const drawImageWithRotation = (context, image, x, y, size, degrees) => {
    context.translate(x + (size / 2), y + (size / 2));
    context.rotate((degrees * Math.PI) / 180);
    context.drawImage(image, -size / 2, -size / 2, size, size);
    context.rotate((-degrees * Math.PI) / 180);
    context.translate(-x + (size / 2), -y + (size / 2));
};

const resourceColors = ['#5a8236', '#898b90', '#a9d283', '#e8df6f'];

export default {
    groups: [
        {
            label: 'Tiles',
            type: 'custom',
            items: tiles.slice(0, 2),
            component: Tile,
            textureMapper: (context, faceImage, size) => {
                drawImageWithRotation(context, faceImage, size / 1.6, size / 4, size / 4, 180);
            },
        },
        {
            label: 'Resources',
            type: 'custom',
            items: resources.slice(0, 2),
            component: Resource,
            textureMapper: (context, faceImage, size) => {
                context.drawImage(faceImage, size / 2, size / 2, size / 2, size / 2);
                context.drawImage(faceImage, 0, size / 2, size / 2, size / 2);
            },
        },
        {
            label: 'Building cards',
            type: 'card',
            items: buildingCards,
            component: BuildingCard,
        },
    ],
    models: [
        { group: 'Tiles', content: tileModel },
        { group: 'Resources', content: resourceModel },
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
            ...resources.map((resource, index) => ({
                type: 'Infinite_Bag',
                position: {
                    x: (Math.floor(index / 3) * 4) - 6,
                    y: (index % 3) * 4,
                },
                color: resourceColors[Math.floor(index / 3)],
                contents: {
                    group: 'Resources',
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
        ],
    },
};
