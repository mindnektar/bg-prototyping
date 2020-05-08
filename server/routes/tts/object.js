const { v4: uuid } = require('uuid');

export default ({ type = 'Custom_Model', mesh, texture, children, position }) => {
    let typeData = {};

    switch (type) {
        case 'Bag':
            typeData = {
                MaterialIndex: -1,
                MeshIndex: -1,
                Number: 0,
                ContainedObjects: children,
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

    return {
        Name: type,
        Transform: {
            posX: position || 1.00500011,
            posY: 3.05016947,
            posZ: 5.02499,
            rotX: 359.992218,
            rotY: 180.016769,
            rotZ: -0.0005187531,
            scaleX: 1.0,
            scaleY: 1.0,
            scaleZ: 1.0,
        },
        Nickname: '',
        Description: '',
        GMNotes: '',
        ColorDiffuse: {
            r: 1.0,
            g: 1.0,
            b: 1.0,
        },
        Locked: false,
        Grid: true,
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
