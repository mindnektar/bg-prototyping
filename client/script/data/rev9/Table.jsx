import React, { useContext } from 'react';
import TableObject from 'TableObject';
import DataContext from 'contexts/data';

const Table = () => {
    const { groups } = useContext(DataContext);

    const group = (label) => (
        groups.find((item) => item.label === label)
    );

    return (
        <div className="rev9-table">
            <TableObject
                group="Game board"
                collider="self"
                locked
                zPosition={0.05}
            />

            <div className="rev9-table__bags">
                <div className="rev9-table__bag">
                    <TableObject
                        type="bag"
                        locked
                        contents={group('Tiles').items.map((item, index) => ({
                            group: 'Tiles',
                            textureIndex: index,
                            gridSnapping: true,
                        }))}
                    />
                </div>

                <div className="rev9-table__bag">
                    <TableObject
                        type="bag"
                        locked
                        infinite
                        contents={[{
                            group: 'Pieces',
                            modelIndex: 0,
                            color: '#ffffff',
                        }]}
                    />
                </div>

                <div className="rev9-table__bag">
                    <TableObject
                        type="bag"
                        locked
                        infinite
                        contents={[{
                            group: 'Pieces',
                            modelIndex: 10,
                            color: '#ffffff',
                            glass: true,
                        }]}
                    />
                </div>
            </div>

            <div className="rev9-table__landscape">
                <TableObject
                    group="Start tile"
                    gridSnapping
                    zPosition={0.05}
                />
            </div>

            <div className="rev9-table__players">
                {group('Player boards').items.map((_, index) => (
                    <div key={index} className="rev9-table__player">
                        <TableObject
                            group="Player boards"
                            textureIndex={index}
                            collider="self"
                            locked
                            zPosition={0.2}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Table;
