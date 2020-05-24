import ttsObject from './object';

export default (
    { modelIndex, textureIndex, selfCollider, customCollider, glass, group, ...object },
    makeUrl
) => {
    const mesh = makeUrl(group, `${modelIndex || 0}.obj`);
    const texture = textureIndex !== undefined ? makeUrl(group, `${textureIndex}.png`) : '';
    let collider = '';
    let material = 1;
    let shader = {
        SpecularColor: {
            r: 1.0,
            g: 1.0,
            b: 1.0,
        },
        SpecularIntensity: 0.0,
        SpecularSharpness: 2.0,
        FresnelStrength: 0.0,
    };

    if (texture) {
        material = 3;
    } else if (glass) {
        material = 4;
        shader = {
            SpecularColor: {
                r: 0.5332915,
                g: 0.5332915,
                b: 0.5332915,
            },
            SpecularIntensity: 10.0,
            SpecularSharpness: 7.5,
            FresnelStrength: 0.2,
        };
    }

    if (selfCollider) {
        collider = mesh;
    } else if (customCollider) {
        collider = makeUrl(group, `${modelIndex || 0}.collider.obj`);
    }

    return {
        ...ttsObject(object),
        name: 'Custom_Model',
        CustomMesh: {
            MeshURL: mesh,
            DiffuseURL: texture,
            NormalURL: '',
            ColliderURL: collider,
            Convex: !collider,
            MaterialIndex: material,
            TypeIndex: 0,
            CustomShader: shader,
            CastShadows: true,
        },
    };
};
