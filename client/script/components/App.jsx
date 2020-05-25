import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import data from 'data';
import DataContext from 'contexts/data';
import Sidebar from './App/Sidebar';
import Content from './App/Content';

const App = (props) => {
    const project = data.find(({ path }) => path === props.location.pathname);
    const dataValue = project ? {
        groups: project.groups,
        tts: project.tts,
        table: project.table,
    } : null;

    return (
        <div className="container">
            <DataContext.Provider value={dataValue}>
                <Sidebar />
                <Content />
            </DataContext.Provider>
        </div>
    );
};

App.propTypes = {
    location: PropTypes.object.isRequired,
};

export default withRouter(App);
