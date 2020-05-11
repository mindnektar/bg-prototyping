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

export default [
    {
        label: 'Tiles',
        items: tiles.slice(0, 1),
        component: Tile,
        model: tileModel,
        textureMapper: (context, faceImage, size) => {
            faceImage.style = 'transform: rotate(180deg)';
            context.fillStyle = '#d4d4d4';
            context.fillRect(0, 0, size, size);
            drawImageWithRotation(context, faceImage, size / 1.6, size / 4, size / 4, 180);
        },
    },
    {
        label: 'Resources',
        items: resources.slice(0, 1),
        component: Resource,
        model: resourceModel,
        textureMapper: (context, faceImage, size) => {
            context.fillStyle = '#d4d4d4';
            context.fillRect(0, 0, size, size);
            context.drawImage(faceImage, size / 2, size / 2, size / 2, size / 2);
            context.drawImage(faceImage, 0, size / 2, size / 2, size / 2);
        },
    },
    {
        label: 'Building cards',
        items: buildingCards,
        component: BuildingCard,
    },
];
