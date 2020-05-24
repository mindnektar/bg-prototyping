import ttsObject from './object';

export default ({ contents, infinite, ...object }) => ({
    ...ttsObject(object),
    name: infinite ? 'Infinite_Bag' : 'Bag',
    MaterialIndex: -1,
    MeshIndex: -1,
    Number: 0,
    ContainedObjects: contents,
});
