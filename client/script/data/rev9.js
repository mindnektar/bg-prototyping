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
    context.drawImage(image, -size / 2, -size / 2);
    context.rotate((-degrees * Math.PI) / 180);
    context.translate(-x + (size / 2), -y + (size / 2));
};

export default [
    {
        label: 'Tiles',
        items: tiles,
        component: Tile,
        model: tileModel,
        textureMapper: (canvas, faceImage, size) => {
            const context = canvas.getContext('2d');

            faceImage.style = 'transform: rotate(180deg)';
            canvas.width = size * 4;
            canvas.height = size * 4;
            context.fillStyle = '#d4d4d4';
            context.fillRect(0, 0, size * 4, size * 4);
            drawImageWithRotation(context, faceImage, size * 2.5, size, size, 180);

            return canvas.toDataURL();
        },
    },
    {
        label: 'Resources',
        items: resources,
        component: Resource,
        model: resourceModel,
        textureMapper: (canvas, faceImage, size) => {
            const context = canvas.getContext('2d');

            canvas.width = size * 2;
            canvas.height = size * 2;
            context.fillStyle = '#d4d4d4';
            context.fillRect(0, 0, size * 2, size * 2);
            context.drawImage(faceImage, size, size);
            context.drawImage(faceImage, 0, size);

            return canvas.toDataURL();
        },
    },
    {
        label: 'Building cards',
        items: buildingCards,
        component: BuildingCard,
    },
];
