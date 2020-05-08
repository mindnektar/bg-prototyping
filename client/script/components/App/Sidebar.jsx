import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import sequential from 'promise-sequential';
import htmlToImage from 'html-to-image';
import JSZip from 'jszip';
import axios from 'axios';
import data from 'data';
import Button from 'atoms/Button';
import List from './Sidebar/List';
import ConversionProgress from './Sidebar/ConversionProgress';

const Sidebar = (props) => {
    const [progress, setProgress] = useState(null);

    const convert = async () => {
        let { groups } = data.find(({ path }) => path === props.location.pathname);
        groups = groups.filter(({ label }) => !props.filter.includes(label));
        const convertibles = document.querySelectorAll('.convertible');
        let done = 0;

        setProgress({ image: { done, total: convertibles.length } });

        const files = await sequential(Array.from(convertibles).map((convertible) => async () => {
            const { group, filename } = convertible.dataset;
            const { textureMapper } = groups.find(({ label }) => label === group);
            const { width, height } = convertible.getBoundingClientRect();
            const image = new Image(width, height);

            image.src = await htmlToImage.toPng(convertible);

            const file = {
                dataUrl: await new Promise((resolve) => {
                    image.onload = () => {
                        resolve(textureMapper(document.createElement('canvas'), image, width));
                    };
                }),
                filename,
                folder: group,
            };

            done += 1;

            setProgress({ image: { done, total: convertibles.length } });

            return file;
        }));
        const zip = new JSZip();

        files.forEach((file) => {
            const [, image] = file.dataUrl.split('base64,');
            zip.folder(file.folder).file(`${file.filename}.png`, image, { base64: true });
        });

        const file = await zip.generateAsync({ type: 'blob' });
        const formData = new FormData();

        formData.append('file', file);
        formData.append('path', props.location.pathname);
        formData.append('data', JSON.stringify(groups.map(({ label, model }) => ({
            group: label,
            model,
        }))));

        await new Promise((resolve) => window.setTimeout(resolve, 500));

        setProgress({ uploading: true });

        const response = await axios.post('http://localhost:9495/media/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        setProgress({ result: JSON.stringify(response.data, null, 2) });
    };

    const finishConversion = () => {
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
                Convert
            </Button>

            <ConversionProgress
                progress={progress}
                close={finishConversion}
            />

            <List
                groups={groups}
                filter={props.filter}
                setFilter={props.setFilter}
            />
        </div>
    );
};

Sidebar.propTypes = {
    filter: PropTypes.array.isRequired,
    setFilter: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
};

export default withRouter(Sidebar);
