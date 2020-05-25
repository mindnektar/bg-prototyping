import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Headline from 'atoms/Headline';
import data from 'data';

const Projects = (props) => {
    const goToProjectHandler = (path) => () => {
        props.history.push(path);
    };

    return (
        <div className="content-projects">
            <Headline>Projects</Headline>

            <div className="content-projects__list">
                {data.map((item) => (
                    <div
                        key={item.path}
                        className="content-projects__item"
                        onClick={goToProjectHandler(item.path)}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

Projects.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(Projects);
