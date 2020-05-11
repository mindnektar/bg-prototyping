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
    const [progress, setProgress] = useState(null);
    const [shouldUpdateTextures, setShouldUpdateTextures] = useLocalStorage('shouldUpdateTextures', true);
    const [filter] = useLocalStorage('filter', []);
    const [conversionResult, setConversionResult] = useState(null);

    const toggleShouldUpdateTextures = () => {
        setShouldUpdateTextures(!shouldUpdateTextures);
    };

    const convert = async () => {
        let { groups } = data.find(({ path }) => path === props.location.pathname);
        groups = groups.filter(({ label }) => !filter.includes(label));
        const formData = new FormData();

        if (shouldUpdateTextures) {
            const convertibles = document.querySelectorAll('.convertible');
            let done = 0;

            setProgress({ image: { done, total: convertibles.length } });

            const files = await sequential((
                Array.from(convertibles).map((convertible) => async () => {
                    const { group, filename } = convertible.dataset;
                    const { textureMapper } = groups.find(({ label }) => label === group);
                    const canvas = document.createElement('canvas');
                    const canvasSize = 1024;
                    const image = new Image(canvasSize, canvasSize);

                    canvas.width = canvasSize;
                    canvas.height = canvasSize;
                    image.src = await htmlToImage.toPng(convertible);

                    const file = {
                        dataUrl: await new Promise((resolve) => {
                            image.onload = () => {
                                const context = canvas.getContext('2d');

                                textureMapper(context, image, canvasSize);

                                resolve(canvas.toDataURL());
                            };
                        }),
                        filename,
                        folder: group,
                    };

                    done += 1;

                    setProgress({ image: { done, total: convertibles.length } });

                    return file;
                })
            ));
            const zip = new JSZip();

            files.forEach((file) => {
                const [, image] = file.dataUrl.split('base64,');
                zip.folder(file.folder).file(`${file.filename}.png`, image, { base64: true });
            });

            const file = await zip.generateAsync({ type: 'blob' });

            formData.append('file', file);
        } else {
            setProgress({ uploading: true });
        }

        formData.append('path', props.location.pathname);
        formData.append('data', JSON.stringify(groups.map(({ label, model, items }) => ({
            group: label,
            model,
            itemCount: items.length,
        }))));

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
