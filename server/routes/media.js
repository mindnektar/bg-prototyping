import express from 'express';
import fileUpload from 'express-fileupload';
import asyncHandler from 'express-async-handler';
import JSZip from 'jszip';
import FtpClient from 'promise-ftp';
import sequential from 'promise-sequential';
import ttsFile from './tts/file';
import ttsObject from './tts/object';

const router = express.Router();

router.use(fileUpload());

const urlSafe = (url) => (
    url.split('/').map((segment) => encodeURI(segment)).join('/')
);

const mediaUploadHandler = asyncHandler(async (req, res) => {
    const zip = await JSZip.loadAsync(req.files.file.data);
    const ftp = new FtpClient();
    const uploadPrefix = '/html';
    const directory = `/proto${req.body.path}/`;
    const data = JSON.parse(req.body.data);
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

        const fileData = await file.async('nodebuffer');

        return ftp.put(fileData, filePath);
    }));

    await sequential(data.map(({ group, model }) => async () => (
        ftp.put(Buffer.from(model), `${uploadPrefix}${directory}${group}/model.obj`)
    )));

    await ftp.end();

    const now = new Date().getTime();
    let bagPosition = -8;

    const result = ttsFile({
        objects: data.map(({ group }) => {
            bagPosition += 4;

            return ttsObject({
                type: 'Bag',
                position: bagPosition,
                children: files
                    .filter((file) => !file.dir && file.name.split('/')[0] === group)
                    .map((file) => ttsObject({
                        mesh: `http://denk.alfahosting.org${directory}${group}/model.obj?${now}`,
                        texture: `http://denk.alfahosting.org${directory}${urlSafe(file.name)}?${now}`,
                    })),
            });
        }),
    });

    res.send(result);
});

router.post('/', mediaUploadHandler);

module.exports = router;
