import React from 'react';
import Face from 'Face';
import Icon from 'atoms/Icon';
import Gold from '../Gold';
import Resource from '../Resource';

const Market = () => (
    <Face name="market" className="rev9-market">
        <div className="rev9-market__top">
            <div className="rev9-market__building-cards">
                <div className="rev9-market__building-card-stack">
                    <Icon type="construction" context="rev9" />
                </div>
                <div className="rev9-market__building-card">
                    <Icon type="construction" context="rev9" />
                </div>
                <div className="rev9-market__building-card">
                    <Icon type="construction" context="rev9" />
                </div>
                <div className="rev9-market__building-card">
                    <Icon type="construction" context="rev9" />
                </div>
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
                        {Array(4).fill(null).map((__, index) => (
                            <div key={index}>
                                <Resource type="wood" level={levelIndex + 1} />

                                {4 - levelIndex - 1 > index && (
                                    <div className="rev9-market__fill" />
                                )}
                            </div>
                        ))}

                        {Array(4).fill(null).map((__, index) => (
                            <div key={index}>
                                <Resource type="stone" level={levelIndex + 1} />

                                {4 - levelIndex - 1 > index && (
                                    <div className="rev9-market__fill" />
                                )}
                            </div>
                        ))}

                        {Array(4).fill(null).map((__, index) => (
                            <div key={index}>
                                <Resource type="fabric" level={levelIndex + 1} />

                                {4 - levelIndex - 1 > index && (
                                    <div className="rev9-market__fill" />
                                )}
                            </div>
                        ))}

                        {Array(4).fill(null).map((__, index) => (
                            <div key={index}>
                                <Resource type="wheat" level={levelIndex + 1} />

                                {4 - levelIndex - 1 > index && (
                                    <div className="rev9-market__fill" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </Face>
);

export default Market;
