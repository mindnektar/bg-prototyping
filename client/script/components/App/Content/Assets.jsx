import React, { useContext } from 'react';
import { useLocalStorage } from '@rehooks/local-storage';
import DataContext from 'contexts/data';
import Group from './Assets/Group';

const Assets = () => {
    const [filter] = useLocalStorage('filter', []);
    const data = useContext(DataContext);

    return (
        <div className="content-assets">
            {data.groups.map((group) => (
                <Group
                    key={group.label}
                    filtered={filter.includes(group.label)}
                    {...group}
                />
            ))}
        </div>
    );
};

export default Assets;
