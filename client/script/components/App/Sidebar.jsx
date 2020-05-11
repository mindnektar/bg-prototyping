import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import sequential from 'promise-sequential';
import htmlToImage from 'html-to-image';
import JSZip from 'jszip';
import axios from 'axios';
import download from 'downloadjs';
import { useLocalStorage } from '@rehooks/local-storage';
import data from 'data';
import Button from 'atoms/Button';
import Checkbox from 'atoms/Checkbox';
import List from './Sidebar/List';
import ConversionProgress from './Sidebar/ConversionProgress';

const Sidebar = (props) => {
    const [shouldUpdateTextures, setShouldUpdateTextures] = useLocalStorage('shouldUpdateTextures', true);
    const [progress, setProgress] = useState(null);
    const [conversionResult, setConversionResult] = useState(null);

    const toggleShouldUpdateTextures = () => {
        setShouldUpdateTextures(!shouldUpdateTextures);
    };

    const convert = async () => {
        const { groups, tts, models } = data.find(({ path }) => path === props.location.pathname);
        const formData = new FormData();

        if (shouldUpdateTextures) {
            const allConvertibles = document.querySelectorAll('.convertible');
            let done = 0;

            setProgress({ image: { done, total: allConvertibles.length } });

            const customFiles = (await sequential((
                groups.filter(({ type }) => type === 'custom').map((group) => () => {
                    const convertibles = document.querySelectorAll(`.convertible[data-group="${group.label}"]`);

                    return sequential((
                        Array.from(convertibles).map((convertible, index) => async () => {
                            const canvas = document.createElement('canvas');
                            const context = canvas.getContext('2d');
                            const canvasSize = 1024;
                            const image = new Image(canvasSize, canvasSize);

                            canvas.width = canvasSize;
                            canvas.height = canvasSize;
                            image.src = await htmlToImage.toPng(convertible);
                            context.fillStyle = '#d4d4d4';
                            context.fillRect(0, 0, canvasSize, canvasSize);

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

                            done += 1;

                            setProgress({ image: { done, total: allConvertibles.length } });

                            return file;
                        })
                    ));
                })
            )));

            const cardFiles = await sequential((
                groups.filter(({ type }) => type === 'card').map((group) => async () => {
                    const convertibles = document.querySelectorAll(`.convertible[data-group="${group.label}"]`);
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    const { width, height } = convertibles[0].getBoundingClientRect();

                    canvas.width = 3 * width;
                    canvas.height = 2 * height;

                    await sequential((
                        Array.from(convertibles).map((convertible, index) => async () => {
                            const image = new Image(width, height);

                            image.src = await htmlToImage.toPng(convertible);

                            await new Promise((resolve) => {
                                image.onload = () => {
                                    context.drawImage(
                                        image,
                                        width * (index % 3),
                                        height * Math.floor(index / 3),
                                        width,
                                        height,
                                    );
                                    resolve();
                                };
                            });

                            done += 1;

                            setProgress({ image: { done, total: allConvertibles.length } });
                        })
                    ));

                    return {
                        dataUrl: canvas.toDataURL(),
                        filename: group.label,
                    };
                })
            ));

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

            const file = await zip.generateAsync({ type: 'blob' });

            formData.append('file', file);
        } else {
            setProgress({ uploading: true });
        }

        formData.append('path', props.location.pathname);
        formData.append('tts', JSON.stringify(tts));

        await new Promise((resolve) => window.setTimeout(resolve, 500));

        setProgress({ uploading: true });

        const response = await axios.post('http://localhost:9495/media/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        setConversionResult(JSON.stringify(response.data, null, 2));

        setProgress({ done: true });
    };

    const finishConversion = () => {
        download(conversionResult, 'TS_Save_1000.json', 'text/plain');
        setProgress(null);
    };

    const { groups } = data.find(({ path }) => path === props.location.pathname) || {};

    if (!groups) {
        return (
            <div className="sidebar" />
        );
    }

    return (
        <div className="sidebar">
            <Button onClick={convert}>
                Create TTS file
            </Button>

            <ConversionProgress
                progress={progress}
                download={finishConversion}
            />

            <Checkbox
                label="Update textures"
                checked={shouldUpdateTextures}
                onChange={toggleShouldUpdateTextures}
            />

            <List groups={groups} />
        </div>
    );
};

Sidebar.propTypes = {
    location: PropTypes.object.isRequired,
};

export default withRouter(Sidebar);
