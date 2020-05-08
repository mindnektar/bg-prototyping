import BuildingCard from 'components/rev9/BuildingCard';
import Resource from 'components/rev9/Resource';
import Tile from 'components/rev9/Tile';
import buildingCards from './rev9/building-cards';
import resources from './rev9/resources';
import tiles from './rev9/tiles';

export default [
    {
        label: 'Tiles',
        items: tiles.slice(0, 1),
        component: Tile,
        type: 'tile-square',
    },
    {
        label: 'Resources',
        items: resources,
        component: Resource,
    },
    {
        label: 'Building cards',
        items: buildingCards,
        component: BuildingCard,
    },
];
