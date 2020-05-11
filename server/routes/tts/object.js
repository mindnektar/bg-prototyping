const { v4: uuid } = require('uuid');

export default ({ type = 'Custom_Model', mesh, texture, contents, position, scale, color, gridSnapping }) => {
    let typeData = {};

    switch (type) {
        case 'Bag':
        case 'Infinite_Bag':
            typeData = {
                MaterialIndex: -1,
                MeshIndex: -1,
                Number: 0,
                ContainedObjects: contents,
            };
            break;

        case 'Deck':
            typeData = {
                SidewaysCard: false,
                DeckIDs: contents,
                CustomDeck: {
                    1: {
                        FaceURL: texture,
                        BackURL: texture,
                        NumWidth: 3,
                        NumHeight: 2,
                        BackIsHidden: true,
                        UniqueBack: false,
                    },
                },
            };
            break;

        default:
            typeData = {
                CustomMesh: {
                    MeshURL: mesh,
                    DiffuseURL: texture,
                    NormalURL: '',
                    ColliderURL: '',
                    Convex: true,
                    MaterialIndex: 3,
                    TypeIndex: 0,
                    CustomShader: {
                        SpecularColor: {
                            r: 1.0,
                            g: 1.0,
                            b: 1.0,
                        },
                        SpecularIntensity: 0.0,
                        SpecularSharpness: 2.0,
                        FresnelStrength: 0.0,
                    },
                    CastShadows: true,
                },
            };
    }

    const positionValues = { posX: 0, posY: 0, posZ: 0 };

    if (position) {
        if (position.x) {
            positionValues.posX = position.x;
        }

        if (position.y) {
            positionValues.posZ = position.y;
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
            rotX: 359.992218,
            rotY: 180.016769,
            rotZ: -0.0005187531,
            ...scaleValues,
        },
        Nickname: '',
        Description: '',
        GMNotes: '',
        ColorDiffuse: colorDiffuse,
        Locked: false,
        Grid: gridSnapping || false,
        Snap: true,
        IgnoreFoW: false,
        Autoraise: true,
        Sticky: true,
        Tooltip: true,
        GridProjection: false,
        HideWhenFaceDown: false,
        Hands: false,
        ...typeData,
        XmlUI: '',
        LuaScript: '',
        LuaScriptState: '',
        GUID: uuid().substring(0, 6),
    };
};
