import React from 'react';
import SnapPoint from 'SnapPoint';
import Icon from 'atoms/Icon';

const iconType = (index) => {
    if (index <= 3) {
        return 'exploration';
    }

    if (index <= 7) {
        return 'construction';
    }

    if (index === 8) {
        return 'tower';
    }

    if (index === 9) {
        return 'diamond';
    }

    return 'market';
};

const Actions = () => (
    <div className="rev9-actions">
        <div className="rev9-actions__tiles">
            <SnapPoint>
                <Icon type="exploration" context="rev9" />
            </SnapPoint>
            <SnapPoint>
                <Icon type="exploration" context="rev9" />
            </SnapPoint>
            <SnapPoint>
                <Icon type="exploration" context="rev9" />
            </SnapPoint>
            <SnapPoint>
                <Icon type="exploration" context="rev9" />
            </SnapPoint>
        </div>

        <div className="rev9-actions__actions">
            {Array(11).fill(null).map((_, index) => (
                <div
                    className="rev9-actions__action"
                    key={index}
                >
                    <Icon type={iconType(index)} context="rev9" />

                    <div className="rev9-actions__spots">
                        <SnapPoint className="rev9-actions__spot" />
                        <SnapPoint className="rev9-actions__spot" />
                        <SnapPoint className="rev9-actions__spot" />
                        <SnapPoint className="rev9-actions__spot" />
                        <SnapPoint className="rev9-actions__spot" />
                        <SnapPoint className="rev9-actions__spot" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default Actions;
