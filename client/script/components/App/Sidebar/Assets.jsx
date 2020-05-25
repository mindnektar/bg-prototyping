import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '@rehooks/local-storage';
import download from 'downloadjs';
import DataContext from 'contexts/data';
import convert from 'helpers/convert';
import Button from 'atoms/Button';
import Checkbox from 'atoms/Checkbox';
import List from './Assets/List';
import ConversionProgress from './Assets/ConversionProgress';

const Assets = (props) => {
    const [shouldUpdateTextures, setShouldUpdateTextures] = useLocalStorage('shouldUpdateTextures', true);
    const [progress, setProgress] = useState(null);
    const [conversionResult, setConversionResult] = useState(null);
    const data = useContext(DataContext);

    const toggleShouldUpdateTextures = () => {
        setShouldUpdateTextures(!shouldUpdateTextures);
    };

    const startConversion = async () => {
        const result = await convert({
            groups: data.groups,
            tts: data.tts,
            table: data.table,
            shouldUpdateTextures,
            setProgress,
            path: props.path,
        });

        setConversionResult(result);
    };

    const finishConversion = () => {
        download(conversionResult, 'TS_Save_1000.json', 'text/plain');
        setProgress(null);
    };

    const closeConversion = () => {
        setProgress(null);
    };

    return (
        <div className="sidebar-assets">
            <Button onClick={startConversion}>
                Create TTS file
            </Button>

            <ConversionProgress
                progress={progress}
                onDownload={finishConversion}
                onClose={closeConversion}
            />

            <Checkbox
                label="Update textures"
                checked={shouldUpdateTextures}
                onChange={toggleShouldUpdateTextures}
            />

            <List groups={data.groups} />
        </div>
    );
};

Assets.propTypes = {
    path: PropTypes.string.isRequired,
};

export default Assets;
