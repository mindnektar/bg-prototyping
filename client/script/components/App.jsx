import React from 'react';
import Sidebar from './App/Sidebar';
import Content from './App/Content';

const App = () => (
    <div className="container">
        <div className="card-size-check" />
        <Sidebar />
        <Content />
    </div>
);

export default App;
