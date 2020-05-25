import React, { useContext } from 'react';
import DataContext from 'contexts/data';
import TableObject from 'TableObject';

const StartTile = () => {
    const { constants } = useContext(DataContext);

    return (
        <div className="rev9-start-tile">
            <div
                className="rev9-start-tile__corner"
                style={{
                    borderTopColor: '#a9d283',
                    borderRightColor: '#f79046',
                    borderBottomColor: '#f79046',
                    borderLeftColor: '#a9d283',
                }}
            />

            <div
                className="rev9-start-tile__corner"
                style={{
                    borderTopColor: '#5a8236',
                    borderRightColor: '#5a8236',
                    borderBottomColor: '#f79046',
                    borderLeftColor: '#f79046',
                }}
            />

            <div
                className="rev9-start-tile__corner"
                style={{
                    borderTopColor: '#f79046',
                    borderRightColor: '#f79046',
                    borderBottomColor: '#e8df6f',
                    borderLeftColor: '#e8df6f',
                }}
            />

            <div
                className="rev9-start-tile__corner"
                style={{
                    borderTopColor: '#f79046',
                    borderRightColor: '#898b90',
                    borderBottomColor: '#898b90',
                    borderLeftColor: '#f79046',
                }}
            />

            {Array(4).fill(null).map((_, index) => (
                <div
                    key={index}
                    className="rev9-start-tile__wagon"
                    style={{
                        left: `${[2, 1, 3, 2][index] * 25}%`,
                        top: `${[1, 2, 2, 3][index] * 25}%`,
                    }}
                >
                    <TableObject
                        group="Pieces"
                        modelIndex={5}
                        color={constants.playerColors[index]}
                        zPosition={2}
                    />
                </div>
            ))}
        </div>
    );
};

export default StartTile;
