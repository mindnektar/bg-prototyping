import ttsObject from './object';

export default (
    { modelIndex, textureIndex, collider, glass, group, ...object },
    makeUrl
) => {
    const meshUrl = makeUrl(group, `${modelIndex || 0}.obj`);
    const textureUrl = textureIndex !== undefined ? makeUrl(group, `${textureIndex}.png`) : '';
    let colliderUrl = '';
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

    if (textureUrl) {
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

    if (collider === 'self') {
        colliderUrl = meshUrl;
    } else if (collider === 'custom') {
        colliderUrl = makeUrl(group, `${modelIndex || 0}.collider.obj`);
    }

    return {
        ...ttsObject(object),
        name: 'Custom_Model',
        CustomMesh: {
            MeshURL: meshUrl,
            DiffuseURL: textureUrl,
            NormalURL: '',
            ColliderURL: colliderUrl,
            Convex: !colliderUrl,
            MaterialIndex: material,
            TypeIndex: 0,
            CustomShader: shader,
            CastShadows: true,
        },
    };
};
