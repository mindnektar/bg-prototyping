import React, { useContext } from 'react';
import { useLocalStorage } from '@rehooks/local-storage';
import DataContext from 'contexts/data';
import Projects from './Content/Projects';
import Assets from './Content/Assets';
import Table from './Content/Table';

const Content = () => {
    const [sidebarActiveTab] = useLocalStorage('sidebarActiveTab');
    const data = useContext(DataContext);

    const renderContent = () => {
        if (!data) {
            return <Projects />;
        }

        return [
            <Assets />,
            <Table />,
        ][sidebarActiveTab];
    };

    return (
        <div className="content">
            {renderContent()}
        </div>
    );
};

export default Content;
