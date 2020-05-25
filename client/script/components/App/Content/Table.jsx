import React, { useRef, useState, useEffect, useContext } from 'react';
import DataContext from 'contexts/data';
import Headline from 'atoms/Headline';

const Table = () => {
    const tableRef = useRef();
    const innerRef = useRef();
    const [scale, setScale] = useState(null);
    const data = useContext(DataContext);

    useEffect(() => {
        setScale(Math.min(
            tableRef.current.offsetWidth / innerRef.current.offsetWidth,
            tableRef.current.offsetHeight / innerRef.current.offsetHeight,
        ));
    }, []);

    return (
        <div className="content-table">
            <Headline>Table</Headline>

            <div
                className="content-table__table"
                ref={tableRef}
            >
                <div
                    className="content-table__inner"
                    style={{ transform: scale ? `scale(${scale}) translate(-50%, -50%)` : null }}
                    ref={innerRef}
                    data-table
                >
                    {React.createElement(data.table)}
                </div>
            </div>
        </div>
    );
};

export default Table;
