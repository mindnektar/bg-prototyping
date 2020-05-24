import fs from 'fs';
import path from 'path';
import express from 'express';
import fileUpload from 'express-fileupload';
import asyncHandler from 'express-async-handler';
import JSZip from 'jszip';
import FtpClient from 'promise-ftp';
import sequential from 'promise-sequential';
import ttsFile from './tts/file';
import ttsCustom from './tts/custom';
import ttsDeck from './tts/deck';
import ttsBag from './tts/bag';

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
            }console.log(filePath);

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
    const makeUrl = (group, filename) => (
        `http://denk.alfahosting.org${directory}${urlSafe(group)}/${filename}?${now}`
    );

    const mapObjects = (object) => {
        if (object.type === 'custom') {
            return ttsCustom({
                ...object,
                type: 'Custom_Model',
            }, makeUrl);
        }

        if (object.type === 'deck') {
            return ttsDeck({
                ...object,
                texture: `http://denk.alfahosting.org${directory}${urlSafe(object.group)}.png?${now}`,
            });
        }

        if (object.type === 'bag') {
            return ttsBag({
                ...object,
                contents: object.contents.map(mapObjects).filter(Boolean),
            });
        }

        return null;
    };

    const result = ttsFile({
        ...tts,
        objects: tts.objects.map(mapObjects).filter(Boolean),
    });

    res.send(result);
});

router.post('/', mediaUploadHandler);

module.exports = router;
