import sequential from 'promise-sequential';
import htmlToImage from 'html-to-image';
import JSZip from 'jszip';
import axios from 'axios';

const calculateCardSprites = (groups) => (
    groups.filter(({ type }) => type === 'card').map((group) => {
        const convertibles = document.querySelectorAll(`.convertible[data-group="${group.label}"]`);

        if (convertibles.length === 0) {
            return [];
        }

        const { width, height } = convertibles[0].getBoundingClientRect();
        let rows = 1;
        let columns = 1;

        convertibles.forEach((_, index) => {
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

const generateCustomFiles = (groups, updateProgress) => (
    sequential((
        groups.filter(({ type }) => type === 'custom').map((group) => () => {
            const convertibles = document.querySelectorAll(`.convertible[data-filtered="false"][data-group="${group.label}"]`);

            return sequential((
                Array.from(convertibles).map((convertible, index) => async () => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    const canvasSize = 1024;
                    const image = new Image();

                    canvas.width = canvasSize;
                    canvas.height = canvasSize;
                    image.src = await htmlToImage.toSvgDataURL(convertible);
                    context.fillStyle = '#d4d4d4';
                    context.fillRect(0, 0, canvasSize, canvasSize);
                    context.drawImageWithRotation = (imageElem, x, y, size, degrees) => {
                        context.translate(x + (size / 2), y + (size / 2));
                        context.rotate((degrees * Math.PI) / 180);
                        context.drawImage(imageElem, -size / 2, -size / 2, size, size);
                        context.rotate((-degrees * Math.PI) / 180);
                        context.translate(-x + (size / 2), -y + (size / 2));
                    };

                    const file = {
                        dataUrl: await new Promise((resolve) => {
                            image.onload = () => {
                                group.textureMapper(context, image, canvasSize);
                                resolve(canvas.toDataURL());
                            };
                        }),
                        filename: index,
                        folder: group.label,
                    };

                    updateProgress();

                    return file;
                })
            ));
        })
    ))
);

const generateCardFiles = (groups, cardSprites, updateProgress) => (
    sequential((
        groups.filter(({ type }) => type === 'card').map((group) => async () => {
            const convertibles = document.querySelectorAll(`.convertible[data-filtered="false"][data-group="${group.label}"]`);

            if (convertibles.length === 0) {
                return [];
            }

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const { width, height } = convertibles[0].getBoundingClientRect();
            const { rows, columns } = cardSprites.find((sprite) => (
                sprite.group === group.label
            ));

            canvas.width = rows * width;
            canvas.height = columns * height;

            await sequential((
                Array.from(convertibles).map((convertible, index) => async () => {
                    const image = new Image(width, height);

                    image.src = await htmlToImage.toSvgDataURL(convertible);

                    await new Promise((resolve) => {
                        image.onload = () => {
                            context.drawImage(
                                image,
                                width * (index % rows),
                                height * Math.floor(index / rows),
                                width,
                                height,
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

const generateZipFile = (customFiles, cardFiles, models) => {
    const zip = new JSZip();

    customFiles.forEach((file) => {
        const [, image] = file.dataUrl.split('base64,');
        zip.folder(file.folder).file(`${file.filename}.png`, image, { base64: true });
    });

    cardFiles.forEach((file) => {
        const [, image] = file.dataUrl.split('base64,');
        zip.file(`${file.filename}.png`, image, { base64: true });
    });

    models.forEach((model) => {
        zip.folder(model.group).file('model.obj', model.content);
    });

    return zip.generateAsync({ type: 'blob' });
};

export default async ({ groups, tts, models, shouldUpdateTextures, setProgress, path }) => {
    const formData = new FormData();

    const cardSprites = calculateCardSprites(groups);

    if (shouldUpdateTextures) {
        const allConvertibles = document.querySelectorAll('.convertible[data-filtered="false"]');
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

        const file = await generateZipFile(customFiles, cardFiles, models);

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
