const { v4: uuid } = require('uuid');

export default ({ type, position, rotation, scale, color, gridSnapping, locked, snapPoints = [] }) => {
    const positionValues = { posX: 0, posY: 1, posZ: 0 };

    if (position) {
        if (position.x) {
            positionValues.posX = position.x;
        }

        if (position.y) {
            positionValues.posY += position.y;
        }

        if (position.z) {
            positionValues.posZ = position.z;
        }
    }

    const rotationValues = { rotX: 0, rotY: 0, rotZ: 0 };

    if (rotation) {
        if (rotation.x) {
            rotationValues.rotX = rotation.x;
        }

        if (rotation.y) {
            rotationValues.rotY = rotation.y;
        }

        if (rotation.z) {
            rotationValues.rotZ = rotation.z;
        }
    }

    const scaleValues = { scaleX: 1.0, scaleY: 1.0, scaleZ: 1.0 };

    if (scale) {
        scaleValues.scaleX *= scale;
        scaleValues.scaleZ *= scale;
    }

    const colorDiffuse = { r: 1.0, g: 1.0, b: 1.0 };

    if (color) {
        colorDiffuse.r = parseInt(color.substring(1, 3), 16) / 255;
        colorDiffuse.g = parseInt(color.substring(3, 5), 16) / 255;
        colorDiffuse.b = parseInt(color.substring(5, 7), 16) / 255;
    }

    return {
        Name: type,
        Transform: {
            ...positionValues,
            ...rotationValues,
            ...scaleValues,
        },
        Nickname: '',
        Description: '',
        GMNotes: '',
        ColorDiffuse: colorDiffuse,
        Locked: locked || false,
        Grid: gridSnapping || false,
        Snap: true,
        IgnoreFoW: false,
        Autoraise: true,
        Sticky: true,
        Tooltip: true,
        GridProjection: false,
        HideWhenFaceDown: false,
        Hands: false,
        XmlUI: '',
        LuaScript: '',
        LuaScriptState: '',
        AttachedSnapPoints: snapPoints.map((Position) => ({ Position })),
        GUID: uuid().substring(0, 6),
    };
};
