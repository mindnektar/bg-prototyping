import fs from 'fs';
import path from 'path';
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
    const directory = `/proto${req.body.path}/`;
    const tts = JSON.parse(req.body.tts);
    const files = [];

    if (req.files) {
        const zip = await JSZip.loadAsync(req.files.file.data);
        const ftp = new FtpClient();
        const uploadPrefix = '/html';

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

            if (!file.name.includes('.obj')) {
                await fs.promises.mkdir(path.dirname(path.join(__dirname, `../../client/public/images/${req.body.path}/textures/${file.name}`)), { recursive: true });
                await fs.promises.writeFile(path.join(__dirname, `../../client/public/images/${req.body.path}/textures/${file.name}`), fileData);
            }

            return ftp.put(fileData, filePath);
        }));

        await ftp.end();
    }

    const now = new Date().getTime();

    const result = ttsFile({
        ...tts,
        objects: tts.objects.map((object) => {
            if (!object.type) {
                return ttsObject({
                    ...object,
                    mesh: `http://denk.alfahosting.org${directory}${urlSafe(object.group)}/${object.index || 0}.obj?${now}`,
                    texture: `http://denk.alfahosting.org${directory}${urlSafe(object.group)}/${object.index || 0}.png?${now}`,
                });
            }

            if (object.type === 'Deck') {
                return ttsObject({
                    ...object,
                    contents: object.contents.indexes,
                    texture: `http://denk.alfahosting.org${directory}${urlSafe(object.contents.group)}.png?${now}`,
                });
            }

            return ttsObject({
                ...object,
                contents: object.contents.indexes.map((index) => ttsObject({
                    ...object.contents,
                    mesh: `http://denk.alfahosting.org${directory}${urlSafe(object.contents.group)}/0.obj?${now}`,
                    texture: `http://denk.alfahosting.org${directory}${urlSafe(object.contents.group)}/${index}.png?${now}`,
                })),
            });
        }),
    });

    res.send(result);
});

router.post('/', mediaUploadHandler);

module.exports = router;
