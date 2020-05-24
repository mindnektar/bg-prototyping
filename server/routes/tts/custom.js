import ttsObject from './object';

export default ({ mesh, texture, preciseCollision, ...object }) => ({
    ...ttsObject(object),
    name: 'Custom_Model',
    CustomMesh: {
        MeshURL: mesh,
        DiffuseURL: texture || '',
        NormalURL: '',
        ColliderURL: preciseCollision ? mesh : '',
        Convex: !preciseCollision,
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
});
