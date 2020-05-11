import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import data from 'data';
import { useLocalStorage } from '@rehooks/local-storage';
import Headline from 'atoms/Headline';
import Group from './Content/Group';

const Content = (props) => {
    const [filter] = useLocalStorage('filter', []);

    const goToProjectHandler = (path) => () => {
        props.history.push(path);
    };

    const { groups } = data.find(({ path }) => path === props.location.pathname) || {};

    if (!groups) {
        return (
            <div className="content">
                <Headline>Projects</Headline>

                <div className="content__projects">
                    {data.map((item) => (
                        <div
                            key={item.path}
                            className="content__project"
                            onClick={goToProjectHandler(item.path)}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="content">
            {groups.map((group) => (
                filter.includes(group.label) ? (
                    null
                ) : (
                    <Group
                        key={group.label}
                        {...group}
                    />
                )
            ))}
        </div>
    );
};

Content.propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(Content);
