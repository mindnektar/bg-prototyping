import ttsObject from './object';

export default (
    { modelIndex, textureIndex, selfCollider, customCollider, group, ...object },
    makeUrl
) => {
    const mesh = makeUrl(group, `${modelIndex || 0}.obj?`);
    const texture = textureIndex !== undefined ? makeUrl(group, `${textureIndex}.png`) : '';
    let collider = '';

    if (selfCollider) {
        collider = mesh;
    } else if (customCollider) {
        collider = makeUrl(group, `${modelIndex || 0}.collider.obj?`);
    }

    return {
        ...ttsObject(object),
        name: 'Custom_Model',
        CustomMesh: {
            MeshURL: mesh,
            DiffuseURL: texture,
            NormalURL: '',
            ColliderURL: collider,
            Convex: selfCollider || customCollider,
            MaterialIndex: texture ? 3 : 1,
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
};
