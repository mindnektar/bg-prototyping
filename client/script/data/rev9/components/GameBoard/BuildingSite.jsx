import React from 'react';
import resources from 'data/rev9/items/resources';
import Face from 'Face';
import SnapPoint from 'SnapPoint';
import Icon from 'atoms/Icon';
import Resource from '../Resource';

const BuildingSite = () => (
    <Face name="building-site" className="rev9-building-site">
        <div className="rev9-building-site__top">
            <SnapPoint className="rev9-building-site__goal-cards">
                <Icon type="goal" context="rev9" />
            </SnapPoint>

            <div className="rev9-building-site__top-right">
                <div className="rev9-building-site__tower">
                    <SnapPoint className="rev9-building-site__tower-floors">
                        <Icon type="tower" context="rev9" />
                    </SnapPoint>

                    <Icon type="chevron" context="rev9" />

                    <SnapPoint className="rev9-building-site__tower-active">
                        <Icon type="tower" context="rev9" />
                    </SnapPoint>
                </div>

                <div className="rev9-building-site__ranking">
                    {Array(4).fill(null).map((_, index) => (
                        <SnapPoint key={index} className="rev9-building-site__ranking-item">
                            {index + 1}
                        </SnapPoint>
                    ))}
                </div>
            </div>
        </div>

        <div className="rev9-building-site__track">
            {Array(21).fill(null).map((_, index) => (
                <SnapPoint key={index} className="rev9-building-site__track-item">
                    {index}
                </SnapPoint>
            ))}
        </div>

        <div className="rev9-building-site__bottom">
            {Array(4).fill(null).map((_, spotIndex) => (
                <div
                    className="rev9-building-site__spot"
                    key={spotIndex}
                >
                    <div className="rev9-building-site__resources">
                        {resources.map((resource, index) => (
                            <SnapPoint key={index}>
                                <Resource {...resource} />
                            </SnapPoint>
                        ))}
                    </div>

                    <SnapPoint className="rev9-building-site__sale">Verkauf</SnapPoint>

                    <SnapPoint className="rev9-building-site__claim" />
                </div>
            ))}
        </div>
    </Face>
);

export default BuildingSite;
