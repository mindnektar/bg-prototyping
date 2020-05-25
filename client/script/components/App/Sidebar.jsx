import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import DataContext from 'contexts/data';
import TabContainer from 'molecules/TabContainer';
import Assets from './Sidebar/Assets';

const Sidebar = (props) => {
    const data = useContext(DataContext);

    if (!data) {
        return (
            <div className="sidebar" />
        );
    }

    return (
        <div className="sidebar">
            <TabContainer
                name="sidebar"
                tabs={[{
                    label: 'Assets',
                    content: <Assets path={props.location.pathname} />,
                }, {
                    label: 'Table',
                    content: (
                        <div />
                    ),
                }]}
            />
        </div>
    );
};

Sidebar.propTypes = {
    location: PropTypes.object.isRequired,
};

export default withRouter(Sidebar);
