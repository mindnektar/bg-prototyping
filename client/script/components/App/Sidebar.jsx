import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import download from 'downloadjs';
import { useLocalStorage } from '@rehooks/local-storage';
import data from 'data';
import convert from 'helpers/convert';
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

    const startConversion = async () => {
        const { groups, tts, models } = data.find(({ path }) => path === props.location.pathname);

        const result = await convert({
            groups,
            tts,
            models,
            shouldUpdateTextures,
            setProgress,
            path: props.location.pathname,
        });

        setConversionResult(result);
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
            <Button onClick={startConversion}>
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
