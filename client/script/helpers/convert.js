import React from 'react';
import ReactDOM from 'react-dom';
import sequential from 'promise-sequential';
import htmlToImage from 'html-to-image';
import JSZip from 'jszip';
import axios from 'axios';
import DataContext from 'contexts/data';

const createInvisibleElement = () => {
    const element = document.createElement('div');

    element.style = 'opacity: 0; pointer-events: none; position: fixed';
    document.body.appendChild(element);

    return element;
};

const calculateCardSprites = (groups) => (
    groups.filter(({ type }) => type === 'card').map((group) => {
        const element = createInvisibleElement();

        ReactDOM.render(
            React.createElement(group.items[0].component, group.items[0].props),
            element
        );

        const { width, height } = element.getBoundingClientRect();
        let rows = 1;
        let columns = 1;

        document.body.removeChild(element);

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
            count: group.items.length,
        };
    })
);

const calculateSnapPoints = (groups, table, constants) => (
    groups.filter(({ type, items }) => type !== 'card' && items[0].component).map((group) => {
        const element = createInvisibleElement();

        ReactDOM.render(
            React.createElement(
                DataContext.Provider, {
                    value: { groups, table, constants },
                },
                React.createElement(group.items[0].component, group.items[0].props),
            ),
            element
        );

        const elementRect = element.getBoundingClientRect();
        const elementX = elementRect.left + (elementRect.width / 2);
        const elementY = elementRect.top + (elementRect.height / 2);
        const snapPoints = Array.from(element.querySelectorAll('[data-snap-point]'));
        const result = snapPoints.map((snapPoint) => {
            const snapPointRect = snapPoint.getBoundingClientRect();
            const snapPointX = snapPointRect.left + (snapPointRect.width / 2);
            const snapPointY = snapPointRect.top + (snapPointRect.height / 2);

            return {
                x: (elementX - snapPointX) / 100,
                y: 0,
                z: (snapPointY - elementY) / 100,
            };
        });

        document.body.removeChild(element);

        return {
            group: group.label,
            snapPoints: result,
        };
    })
);

const drawImageWithRotation = (context, imageElem, x, y, width, height, degrees) => {
    const imageWidth = degrees % 180 === 90 ? height : width;
    const imageHeight = degrees % 180 === 90 ? width : height;

    context.translate(x + (width / 2), y + (height / 2));
    context.rotate((degrees * Math.PI) / 180);
    context.drawImage(imageElem, -imageWidth / 2, -imageHeight / 2, imageWidth, imageHeight);
    context.rotate((-degrees * Math.PI) / 180);
    context.translate(-x - (width / 2), -y - (height / 2));
};

const generateModels = (groups) => (
    groups.filter(({ type }) => type !== 'card').reduce((result, group) => {
        const models = group.model
            ? [{
                type: 'model',
                content: group.model,
                filename: 0,
                folder: group.label,
            }]
            : group.items.map((item, index) => ({
                type: 'model',
                content: item.model,
                filename: index,
                folder: group.label,
            }));
        const colliders = group.collider
            ? [{
                type: 'model',
                content: group.collider,
                filename: '0.collider',
                folder: group.label,
            }]
            : group.items.map((item, index) => (
                item.collider
                    ? {
                        type: 'model',
                        content: item.collider,
                        filename: `${index}.collider`,
                        folder: group.label,
                    }
                    : null
            )).filter(Boolean);

        return [...result, ...models, ...colliders];
    }, [])
);

const generateCustomFiles = (groups, updateProgress) => (
    sequential((
        groups.filter(({ type }) => type !== 'card').map((group) => async () => {
            const convertibles = document.querySelectorAll(`.convertible[data-group="${group.label}"]`);

            return sequential((
                Array.from(convertibles).map((convertible, index) => async () => {
                    const { textureSize, textureMap, label } = group;
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    const faces = Array.from(convertible.querySelectorAll('[data-face]'));
                    const images = await Promise.all((
                        (faces.length > 0 ? faces : [convertible]).map(async (face) => {
                            const image = new Image();

                            image.dataset.name = face.dataset.face || 'default';
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
                        folder: label,
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

const generateZipFile = (models, customFiles, cardFiles) => {
    const zip = new JSZip();

    models.forEach((file) => {
        zip.folder(file.folder).file(`${file.filename}.obj`, file.content);
    });

    customFiles.forEach((file) => {
        const [, image] = file.dataUrl.split('base64,');
        zip.folder(file.folder).file(`${file.filename}.png`, image, { base64: true });
    });

    cardFiles.forEach((file) => {
        const [, image] = file.dataUrl.split('base64,');
        zip.file(`${file.filename}.png`, image, { base64: true });
    });

    return zip.generateAsync({ type: 'blob' });
};

const generateTableData = (groups, table, constants, cardSprites) => {
    const element = createInvisibleElement();

    ReactDOM.render(
        React.createElement(
            DataContext.Provider, {
                value: { groups, table, constants },
            },
            React.createElement(table),
        ),
        element,
    );

    const objects = Array.from(element.querySelectorAll('[data-object]'));
    const players = Array.from(element.querySelectorAll('[data-player]'));
    const snapPointGroups = calculateSnapPoints(groups, table, constants);
    const tableRect = element.getBoundingClientRect();
    const tableX = tableRect.left + (tableRect.width / 2);
    const tableY = tableRect.top + (tableRect.height / 2);
    const result = {
        players: players.reduce((all, player) => {
            const playerRect = player.getBoundingClientRect();
            const playerX = playerRect.left + (playerRect.width / 2);
            const playerY = playerRect.top + (playerRect.height / 2);
            const position = {
                x: (tableX - playerX) / 100,
                y: 3.8,
                z: (playerY - tableY) / 100,
            };

            return {
                ...all,
                [player.dataset.player]: position,
            };
        }, {}),
        objects: objects.map((object) => {
            const { zPosition, ...data } = JSON.parse(object.dataset.object);
            const objectRect = object.getBoundingClientRect();
            const objectX = objectRect.left + (objectRect.width / 2);
            const objectY = objectRect.top + (objectRect.height / 2);
            const position = {
                x: (tableX - objectX) / 100,
                y: zPosition,
                z: (objectY - tableY) / 100,
            };

            if (data.type === 'deck') {
                const { rows, columns, count } = cardSprites.find(({ group }) => (
                    group === data.group
                ));

                return {
                    ...data,
                    position,
                    cardRows: rows,
                    cardColumns: columns,
                    cardCount: count,
                };
            }

            if (data.type === 'custom') {
                const { snapPoints } = snapPointGroups.find(({ group }) => (
                    group === data.group
                )) || {};

                return {
                    ...data,
                    position,
                    snapPoints,
                };
            }

            return { ...data, position };
        }),
    };

    document.body.removeChild(element);

    return result;
};

export default async ({ groups, table, constants, shouldUpdateTextures, setProgress, path }) => {
    setProgress({ image: { done: 0, total: 0 } });

    const formData = new FormData();
    const cardSprites = calculateCardSprites(groups);

    if (shouldUpdateTextures) {
        const allConvertibles = document.querySelectorAll('.convertible');
        let done = 0;

        setProgress({ image: { done, total: allConvertibles.length } });

        const models = generateModels(groups);
        const customFiles = await generateCustomFiles(groups, () => {
            done += 1;
            setProgress({ image: { done, total: allConvertibles.length } });
        });
        const cardFiles = await generateCardFiles(groups, cardSprites, () => {
            done += 1;
            setProgress({ image: { done, total: allConvertibles.length } });
        });
        const file = await generateZipFile(models, customFiles, cardFiles);

        formData.append('file', file);
    } else {
        setProgress({ uploading: true });
    }

    formData.append('path', path);
    formData.append('tts', JSON.stringify(generateTableData(groups, table, constants, cardSprites)));

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
