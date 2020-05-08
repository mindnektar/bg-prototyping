const fs = require('fs');
const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const asyncHandler = require('express-async-handler');
const JSZip = require('jszip');
const FtpClient = require('promise-ftp');
const sequential = require('promise-sequential');
const { v4: uuid } = require('uuid');

const router = express.Router();

router.use(fileUpload());

const urlSafe = (url) => (
    url.split('/').map((segment) => encodeURI(segment)).join('/')
);

const models = {
    'tile-square': fs.readFileSync(path.join(__dirname, '../models/tile-square.obj')),
};

const mediaUploadHandler = asyncHandler(async (req, res) => {
    const zip = await JSZip.loadAsync(req.files.file.data);
    const ftp = new FtpClient();
    const uploadPrefix = '/html';
    const directory = `/proto${req.body.path}/`;
    const types = JSON.parse(req.body.types);
    const files = [];

    zip.forEach((_, file) => {
        files.push(file);
    });

    await ftp.connect({
        host: 'alfa3007.alfahosting-server.de',
        user: 'web546',
        password: 'ED7K5xH0',
    });

    await sequential(files.map((file) => async () => {
        const filePath = `${uploadPrefix}${directory}${file.name}`;

        if (file.dir) {
            return ftp.mkdir(filePath).catch(() => Promise.resolve());
        }

        const data = await file.async('nodebuffer');

        return ftp.put(data, filePath);
    }));

    await sequential(types.map(({ group, type }) => async () => {
        if (!models[type]) {
            return Promise.resolve();
        }

        return ftp.put(models[type], `${uploadPrefix}${directory}${group}/${type}.obj`);
    }));

    await ftp.end();

    const now = new Date().getTime();
    const ttsList = files.filter((file) => !file.dir).map((file) => {
        const group = file.name.split('/')[0];
        const { type } = types.find((item) => item.group === group);

        if (!models[type]) {
            return null;
        }

        return {
            Name: 'Custom_Model',
            Transform: {
                posX: 1.00500011,
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
            CustomMesh: {
                MeshURL: `http://denk.alfahosting.org${directory}${group}/${type}.obj?${now}`,
                DiffuseURL: `http://denk.alfahosting.org${directory}${urlSafe(file.name)}?${now}`,
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
            XmlUI: '',
            LuaScript: '',
            LuaScriptState: '',
            GUID: uuid().substring(0, 6),
        };
    }).filter(Boolean);

    res.send(ttsList);
});

router.post('/', mediaUploadHandler);

module.exports = router;
