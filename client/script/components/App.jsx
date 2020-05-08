import React, { useState } from 'react';
import Sidebar from './App/Sidebar';
import Content from './App/Content';

const App = () => {
    const [filter, setFilter] = useState([]);

    return (
        <div className="container">
            <Sidebar
                filter={filter}
                setFilter={setFilter}
            />

            <Content
                filter={filter}
            />
        </div>
    );
};

export default App;
