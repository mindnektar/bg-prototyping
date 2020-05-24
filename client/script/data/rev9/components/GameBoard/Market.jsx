import React from 'react';
import Face from 'Face';
import SnapPoint from 'SnapPoint';
import Icon from 'atoms/Icon';
import Gold from '../Gold';
import Resource from '../Resource';

const resourceOrder = ['wood', 'stone', 'fabric', 'wheat'];

const Market = () => (
    <Face name="market" className="rev9-market">
        <div className="rev9-market__top">
            <div className="rev9-market__building-cards">
                <SnapPoint className="rev9-market__building-card-stack">
                    <Icon type="construction" context="rev9" />
                </SnapPoint>

                {Array(3).fill(null).map((_, index) => (
                    <SnapPoint
                        className="rev9-market__building-card"
                        key={index}
                    >
                        <Icon type="construction" context="rev9" />
                    </SnapPoint>
                ))}
            </div>

            <div className="rev9-market__card-prices">
                {Array(3).fill(null).map((__, index) => (
                    <div key={index}>
                        <Gold value={(3 - index) * 2} />
                    </div>
                ))}
            </div>
        </div>

        <div className="rev9-market__bottom">
            {Array(3).fill(null).map((_, levelIndex) => (
                <div key={levelIndex} className="rev9-market__level">
                    <div className="rev9-market__prices">
                        {Array(4).fill(null).map((__, index) => (
                            <div key={index}>
                                <Gold value={(4 - index) * (levelIndex + 1)} />
                            </div>
                        ))}
                    </div>

                    <div className="rev9-market__wares">
                        {Array(16).fill(null).map((__, index) => (
                            <SnapPoint key={index}>
                                <Resource
                                    type={resourceOrder[Math.floor(index / 4)]}
                                    level={levelIndex + 1}
                                />

                                {4 - levelIndex - 1 > index && (
                                    <div className="rev9-market__fill" />
                                )}
                            </SnapPoint>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </Face>
);

export default Market;
