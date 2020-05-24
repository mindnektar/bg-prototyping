import React from 'react';
import SnapPoint from 'SnapPoint';
import Icon from 'atoms/Icon';

const Tower = () => (
    <div className="rev9-tower">
        {Array(8).fill(null).map((_, index) => (
            <SnapPoint
                className="rev9-tower__floor"
                key={index}
            >
                <Icon type="tower" context="rev9" />
            </SnapPoint>
        ))}
    </div>
);

export default Tower;
