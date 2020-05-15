export default (obj, faceIndex, size) => {
    const lines = obj.split('\n');
    const vertices = lines.filter((line) => line.startsWith('vt '));
    const faces = lines.filter((line) => line.startsWith('f '));
    const positionIndex = faces[faceIndex].split(' ').reduce((result, current, index) => {
        if (index === 0) {
            return result;
        }

        if (!result) {
            return current.split('/')[1] - 1;
        }

        if (
            vertices[current.split('/')[1] - 1].split(' ')[1] <= vertices[result].split(' ')[1]
            && vertices[current.split('/')[1] - 1].split(' ')[2] >= vertices[result].split(' ')[2]
        ) {
            return current.split('/')[1] - 1;
        }

        return result;
    }, null);
    const sizeIndex = faces[faceIndex].split(' ').reduce((result, current, index) => {
        if (index === 0) {
            return result;
        }

        if (!result) {
            return current.split('/')[1] - 1;
        }

        if (
            vertices[current.split('/')[1] - 1].split(' ')[1] >= vertices[result].split(' ')[1]
            && vertices[current.split('/')[1] - 1].split(' ')[2] <= vertices[result].split(' ')[2]
        ) {
            return current.split('/')[1] - 1;
        }

        return result;
    }, null);
    const x = vertices[positionIndex].split(' ')[1] * size;
    const y = (1 - vertices[positionIndex].split(' ')[2]) * size;
    const width = (vertices[sizeIndex].split(' ')[1] * size) - x;
    const height = ((1 - vertices[sizeIndex].split(' ')[2]) * size) - y;

    return [x, y, width, height];
};
