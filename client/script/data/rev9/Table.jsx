import React, { useContext } from 'react';
import TableObject from 'TableObject';
import Player from 'Player';
import DataContext from 'contexts/data';

const Table = () => {
    const { groups, constants } = useContext(DataContext);

    const group = (label) => (
        groups.find((item) => item.label === label)
    );

    const renderResources = (index, withCoins) => (
        <div key={index} className="rev9-table__resources-set">
            {group('Resources').items.map((__, resourceIndex) => (
                <div key={resourceIndex} className="rev9-table__bag">
                    <TableObject
                        type="bag"
                        locked
                        infinite
                        color={constants.resourceColors[Math.floor(resourceIndex / 3)]}
                        contents={[{
                            group: 'Resources',
                            textureIndex: resourceIndex,
                        }]}
                    />
                </div>
            ))}

            {withCoins && Array(3).fill(null).map((__, resourceIndex) => (
                <div key={resourceIndex} className="rev9-table__bag">
                    <TableObject
                        type="bag"
                        locked
                        infinite
                        contents={[{
                            group: ['Copper', 'Silver', 'Gold'][resourceIndex],
                            textureIndex: 0,
                        }]}
                    />
                </div>
            ))}
        </div>
    );

    return (
        <div className="rev9-table">
            <TableObject
                group="Game board"
                collider="self"
                locked
                zPosition={0.05}
            />

            <div className="rev9-table__resources-game-board">
                <div className="rev9-table__resources">
                    {renderResources()}
                </div>
            </div>

            <div className="rev9-table__construction-markers">
                {Array(4).fill(null).map((_, index) => (
                    <div
                        key={index}
                        className="rev9-table__construction-marker"
                    >
                        <TableObject
                            group="Pieces"
                            modelIndex={7}
                            color={constants.playerColors[index]}
                            zPosition={2}
                        />
                    </div>
                ))}
            </div>

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

                        <Player
                            color={['Yellow', 'Purple', 'Blue', 'Orange'][index]}
                            rotation={180}
                        />
                    </div>
                ))}

                <div className="rev9-table__resources">
                    {Array(2).fill(null).map((_, index) => (
                        renderResources(index, true)
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Table;
