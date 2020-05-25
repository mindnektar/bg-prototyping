import React from 'react';
import TableObject from 'TableObject';

const Table = () => (
    <div className="rev9-table">
        <TableObject
            type="custom"
            group="Game board"
            collider="self"
            locked
        />

        <div className="rev9-table__landscape">
            <TableObject
                type="custom"
                group="Start tile"
            />
        </div>

        <div className="rev9-table__players">
            {Array(4).fill(null).map((_, index) => (
                <div key={index} className="rev9-table__player">
                    <TableObject
                        type="custom"
                        group="Player boards"
                        textureIndex={index}
                        collider="self"
                        locked
                    />
                </div>
            ))}
        </div>
    </div>
);

export default Table;
