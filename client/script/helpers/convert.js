import React from 'react';
import ReactDOM from 'react-dom';
import sequential from 'promise-sequential';
import htmlToImage from 'html-to-image';
import JSZip from 'jszip';
import axios from 'axios';

const calculateCardSprites = (groups) => (
    groups.filter(({ model }) => !model).map((group) => {
        const sizeCheck = document.querySelector('.card-size-check');

        ReactDOM.render(React.createElement(group.component, group.items[0]), sizeCheck);

        const { width, height } = sizeCheck.getBoundingClientRect();
        let rows = 1;
        let columns = 1;

        group.items.forEach((_, index) => {
            if (index + 1 > rows * columns) {
                if (rows * width > columns * height) {
                    columns += 1;
                } else {
                    rows += 1;
                }
            }
        });

        return {
            group: group.label,
            rows,
            columns,
        };
    })
);

const drawImageWithRotation = (context, imageElem, x, y, width, height, degrees) => {
    context.translate(x + (width / 2), y + (height / 2));
    context.rotate((degrees * Math.PI) / 180);
    context.drawImage(imageElem, -width / 2, -height / 2, width, height);
    context.rotate((-degrees * Math.PI) / 180);
    context.translate(-x - (width / 2), -y - (height / 2));
};

const generateCustomFiles = (groups, updateProgress) => (
    sequential((
        groups.filter(({ model }) => !!model).map((group) => async () => {
            const convertibles = document.querySelectorAll(`.convertible[data-group="${group.label}"]`);

            return [
                ...await sequential((
                    Array.from(convertibles).map((convertible, index) => async () => {
                        const { textureSize, textureMap } = group.model;
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        const faces = Array.from(convertible.querySelectorAll('.face'));
                        const images = await Promise.all((
                            (faces.length > 0 ? faces : [convertible]).map(async (face) => {
                                const image = new Image();

                                image.dataset.name = face.dataset.name || 'default';
                                image.src = await htmlToImage.toSvgDataURL(face);

                                return new Promise((resolve) => {
                                    image.onload = () => {
                                        resolve(image);
                                    };
                                });
                            })
                        ));

                        canvas.width = textureSize;
                        canvas.height = textureSize;
                        context.fillStyle = '#d4d4d4';
                        context.fillRect(0, 0, textureSize, textureSize);

                        textureMap.forEach(([name, x1, y1, x2, y2, rotation]) => {
                            drawImageWithRotation(
                                context,
                                images.find(({ dataset }) => dataset.name === name),
                                x1 * textureSize,
                                (1 - y1) * textureSize,
                                (x2 - x1) * textureSize,
                                (y1 - y2) * textureSize,
                                rotation,
                            );
                        });

                        const file = {
                            type: 'texture',
                            dataUrl: canvas.toDataURL(),
                            filename: index,
                            folder: group.label,
                        };

                        updateProgress();

                        return file;
                    })
                )),
                {
                    type: 'model',
                    content: group.model.obj,
                    folder: group.label,
                },
            ];
        })
    ))
);

const generateCardFiles = (groups, cardSprites, updateProgress) => (
    sequential((
        groups.filter(({ model }) => !model).map((group) => async () => {
            const convertibles = document.querySelectorAll(`.convertible[data-group="${group.label}"]`);

            if (convertibles.length === 0) {
                return [];
            }

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const { width, height } = convertibles[0].getBoundingClientRect();
            const { rows, columns } = cardSprites.find((sprite) => (
                sprite.group === group.label
            ));

            canvas.width = rows * width * 2;
            canvas.height = columns * height * 2;

            await sequential((
                Array.from(convertibles).map((convertible, index) => async () => {
                    const image = new Image(width * 2, height * 2);

                    image.src = await htmlToImage.toSvgDataURL(convertible);

                    await new Promise((resolve) => {
                        image.onload = () => {
                            context.drawImage(
                                image,
                                width * 2 * (index % rows),
                                height * 2 * Math.floor(index / rows),
                                width * 2,
                                height * 2,
                            );
                            resolve();
                        };
                    });

                    updateProgress();
                })
            ));

            return {
                dataUrl: canvas.toDataURL(),
                filename: group.label,
            };
        })
    ))
);

const generateZipFile = (customFiles, cardFiles) => {
    const zip = new JSZip();

    customFiles.forEach((file) => {
        if (file.type === 'texture') {
            const [, image] = file.dataUrl.split('base64,');
            zip.folder(file.folder).file(`${file.filename}.png`, image, { base64: true });
        } else {
            zip.folder(file.folder).file('model.obj', file.content);
        }
    });

    cardFiles.forEach((file) => {
        const [, image] = file.dataUrl.split('base64,');
        zip.file(`${file.filename}.png`, image, { base64: true });
    });

    return zip.generateAsync({ type: 'blob' });
};

export default async ({ groups, tts, shouldUpdateTextures, setProgress, path }) => {
    setProgress({ image: { done: 0, total: 0 } });

    const formData = new FormData();

    const cardSprites = calculateCardSprites(groups);

    if (shouldUpdateTextures) {
        const allConvertibles = document.querySelectorAll('.convertible');
        let done = 0;

        setProgress({ image: { done, total: allConvertibles.length } });

        const customFiles = await generateCustomFiles(groups, () => {
            done += 1;
            setProgress({ image: { done, total: allConvertibles.length } });
        });

        const cardFiles = await generateCardFiles(groups, cardSprites, () => {
            done += 1;
            setProgress({ image: { done, total: allConvertibles.length } });
        });

        const file = await generateZipFile(customFiles, cardFiles);

        formData.append('file', file);
    } else {
        setProgress({ uploading: true });
    }

    formData.append('path', path);
    formData.append('tts', JSON.stringify({
        ...tts,
        objects: tts.objects.map((object) => {
            if (object.type === 'Deck') {
                const { rows, columns } = cardSprites.find((sprite) => (
                    sprite.group === object.contents.group
                ));

                return {
                    ...object,
                    cardRows: rows,
                    cardColumns: columns,
                };
            }

            return object;
        }),
    }));

    await new Promise((resolve) => window.setTimeout(resolve, 500));

    setProgress({ uploading: true });

    const response = await axios.post('http://localhost:9495/media/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    setProgress({ done: true });

    return JSON.stringify(response.data, null, 2);
};
